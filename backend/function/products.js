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

    console.log(response)

    return {
      statusCode: 200,
      body: response.data,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
}

module.exports = {
  getProducts
}
