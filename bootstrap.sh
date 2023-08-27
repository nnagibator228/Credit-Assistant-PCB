#!/bin/bash

set -e

NEWLINE=$'\n'

if ! command -v jq &>/dev/null; then
  echo "jq could not be found, please install it https://stedolan.github.io/jq/manual/" >&2
  exit 1
fi

YC_PROFILE=${YC_PROFILE:-default}
if [ -z "$YC_CLOUD_ID" ]; then
  echo "Env variable YC_CLOUD_ID is required" >&2
  exit 1
fi

# Some of cloud entities must have unique name across user's cloud
# So we use this id to avoid name conflicts
APP_ID=$(xxd -l 2 -c 2 -p </dev/random)

TMP_DIR=$(mktemp -d)
function cleanup() {
  echo "Cleanup dir ${TMP_DIR}"
  rm -rf $TMP_DIR
}
trap cleanup EXIT

GH_SECRETS="${GH_SECRETS}${NEWLINE}${NEWLINE}cloud_id: $YC_CLOUD_ID"

function run_yc() {
  yc --profile "$YC_PROFILE" --format json "$@"
}

function create_environment() {
  ENV_NAME=$1
  ENV_NAME_UPPER=$(echo "$ENV_NAME" | tr '[:lower:]' '[:upper:]')

  echo "Creating folder for $ENV_NAME environment"
  ENV_FOLDER_ID=$(run_yc resource-manager folder create --cloud-id "$YC_CLOUD_ID" --name "psb-$ENV_NAME-$APP_ID" | jq -r .id)
  GH_SECRETS="${GH_SECRETS}${NEWLINE}${NEWLINE}psb_$ENV_NAME: psb-$ENV_NAME-$APP_ID"

  echo "Creating deployer service account for $ENV_NAME environment"
  DEPLOYER_SA_ID=$(run_yc iam service-account create --name "deployer-$ENV_NAME-$APP_ID" --folder-id "$ENV_FOLDER_ID" | jq -r .id)
  GH_SECRETS="${GH_SECRETS}${NEWLINE}${NEWLINE}${ENV_NAME_UPPER}_SA_ID: $DEPLOYER_SA_ID"
  
  echo "Creating $ENV_NAME deployer service account static key"
  ENV_DEPLOYER_SA_KEY_PATH="$TMP_DIR/$ENV_NAME-deployer-sa-key.json"
  run_yc iam key create --service-account-id "$DEPLOYER_SA_ID" default-sa -o "$ENV_DEPLOYER_SA_KEY_PATH"
  folder="psb-${ENV_NAME}-${APP_ID}"
  GH_SECRETS="${GH_SECRETS}${NEWLINE}${NEWLINE}SA_${ENV_NAME_UPPER}_DEPLOYER_PRIVATE_KEY: $(cat $ENV_DEPLOYER_SA_KEY_PATH)"

  echo "Granting editor role to $ENV_NAME deployer service account"
  yc --profile "$YC_PROFILE" resource-manager folder add-access-binding --id "$ENV_FOLDER_ID" --role editor --service-account-id "$DEPLOYER_SA_ID"

  echo "Creating api gateway service account for $ENV_NAME environment"
  PSB_GATEWAY_SA_ID=$(run_yc iam service-account create --name "psb-apigw-$ENV_NAME-$APP_ID" --folder-id "$ENV_FOLDER_ID" | jq -r .id)

  echo "Creating api gateway service account for $ENV_NAME environment"
  PSB_GATEWAY_SA_ID=$(run_yc iam service-account create --name "product-apigw-$ENV_NAME-$APP_ID" --folder-id "$ENV_FOLDER_ID" | jq -r .id)

  echo "Granting functions admin role to $ENV_NAME api gateway service account"
  yc --profile "$YC_PROFILE" resource-manager folder add-access-binding --id "$ENV_FOLDER_ID" --role serverless.functions.invoker --service-account-id "$PSB_GATEWAY_SA_ID"

  echo "Creating psb app service account for $ENV_NAME environment"
  PSB_APP_SA_ID=$(run_yc iam service-account create --name "psb-app-$ENV_NAME-$APP_ID" --folder-id "$ENV_FOLDER_ID" | jq -r .id)

}

create_environment prod
create_environment testing

echo "Please, add following to your gitlab CI/CD variables (don't forget to uncgeck Protect variable checkbox for each of them):$GH_SECRETS"
