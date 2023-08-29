const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./params.json', 'utf8'))

const TOKEN = data.token;
const SCORE_SERVICE_URL = data.score + '/score'
const PRODUCT_SERVICE_URL = data.products + '/api/products'

module.exports = {
  TOKEN,
  SCORE_SERVICE_URL,
  PRODUCT_SERVICE_URL
}
