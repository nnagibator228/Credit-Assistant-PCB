const { calculateScore } = require('./scoring');

exports.handler = async (event, context) => { 
    console.log(event);
    try {         
        const scoringData = context.getPayload();
        const totalScore = await calculateScore(scoringData); 
        return {
            statusCode: 200, 
            body: JSON.stringify({ score: totalScore }) 
        }; 
    } catch (error) { 
        console.log(error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ message: 'Something went wrong. Try again later' }) 
        }; 
    } 
};
