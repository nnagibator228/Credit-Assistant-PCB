const {getScoring} = require('./score.js');
const {getProducts} = require('./products.js');

module.exports.handler = async (event, ctx) => {
  const queryParams = event.queryStringParameters;

  const {age, experience, monthlyCreditPayments, monthlyIncome, openLoans, collateralType} = queryParams

  const scoring = await getScoring({
    personalInfo: {
      age,
      experience,
    },
    financialInfo: {
      monthlyCreditPayments,
      monthlyIncome,
      openLoans,
    },
    collateralInfo: {
      collateralType: collateralType || 'flat',
    }
  });

  const {type, min_percent, max_percent, max_sum, max_months} = queryParams;

  const products = await getProducts({
    type,
    min_percent,
    max_percent,
    max_sum,
    max_months,
    scoring: scoring.body
  });

  return products
};
