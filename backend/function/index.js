const {getScoring} = require('./score');
const {getProducts} = require('./products');

module.exports.handler = async (event, ctx) => {
  const queryParams = event.queryStringParameters;

  const {age, experience, monthlyCreditPayments, monthlyIncome, openLoans, collateralType} = queryParams

  const scoring = await getScoring({
    personalInfo: {
      age,
      experience
    },
    financialInfo: {
      monthlyCreditPayments,
      monthlyIncome,
      openLoans
    },
    collateralInfo: {
      collateralType: collateralType || 'flat'
    }
  }).body;

  console.error(scoring)

  const {type, min_percent, max_percent, max_sum, max_months} = queryParams;

  const products = await getProducts(
    type,
    min_percent,
    max_percent,
    max_sum,
    max_months,
    scoring
  )

  return products
}
