const fs = require('fs');

function parseToken() {
  const fileContent = fs.readFileSync('./params.json');
  const jsonData = JSON.parse(fileContent);
  const token = jsonData.token;
  return token;
}

exports.handler = async function (event, context) {
    let response = {
        "isAuthorized": false
    };
    const token = parseToken();
    const bearer = `Bearer [${token}]`
    console.log(bearer);
    console.log(event.headers.Authorization);
    if (event.headers.Authorization === bearer) {
        response = {
            "isAuthorized": true,
        };
    }

    return response;
};
