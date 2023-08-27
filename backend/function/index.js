module.exports.handler = async (event) => {
    return {
        "statusCode": 200,
        "headers": {"content-type": "application/json"},
        "body": "[0, 1, 2]"
    };
};
