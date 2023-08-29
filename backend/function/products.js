const ctx = require('./constant.js')
const axios = require("axios");

const getProducts = async (data) => {
  try {
    const response = await axios.get(ctx.PRODUCT_SERVICE_URL, {
      params: data,
      headers: {
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
  getProducts
}
