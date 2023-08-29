const ctx = require('./constant.js')
const axios = require("axios");

const getScoring = async (data) => {
  try {
    const response = await axios.post(ctx.SCORE_SERVICE_URL, data, {
      headers: {
        'Authorization': `Bearer [${ctx.TOKEN}]`,
        'Content-Type': 'application/json',
      },
    });

    return {
      statusCode: 200,
      body: response.data.score,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Something went wrong. Try again later'}),
    };
  }
}

module.exports = {
  getScoring,
}
