class ScoringData {
    constructor(personalInfo, financialInfo, collateralInfo) {
        this.personalInfo = personalInfo;
        this.financialInfo = financialInfo;
        this.collateralInfo = collateralInfo;
    }
}

class PersonalInfo {
    constructor(age, experience) {
        this.age = age;
        this.experience = experience;
    }
}

class FinancialInfo {
    constructor(monthlyCreditPayments, monthlyIncome, openLoans) {
        this.monthlyCreditPayments = monthlyCreditPayments;
        this.monthlyIncome = monthlyIncome;
        this.openLoans = openLoans
    }
}

class CollateralInfo {
    constructor(collateralType) {
        this.collateralType = collateralType;
    }
}

function calculateScore(scoringData) {

    const { personalInfo, financialInfo, collateralInfo } = scoringData;

    const { age, experience } = personalInfo;
    const { collateralType } = collateralInfo;
    const { monthlyCreditPayments, monthlyIncome, openLoans } = financialInfo;

    const totalScore = (
        scoreAge(age) +
        scoreExperience(experience) +
        scoreCollateralType(collateralType) +
        scoreDeptLoad(newDebtLoad(monthlyCreditPayments, monthlyIncome)) +
        scoreOpenLoans(openLoans)
    );

    return totalScore;
}

module.exports = { calculateScore }

function newDebtLoad(monthlyCreditPayments, monthlyIncome) {
    if (monthlyIncome == 0) {
        if (monthlyCreditPayments == 0) {
            return 0;
        }
        return 1;
    }

    return monthlyCreditPayments / monthlyIncome
}

function scoreAge(age) {

    if (age < 21) {
        return 0;
    }

    if (age <= 22) {
        return 9;
    }
    if (age <= 45) {
        return 15;
    }
    if (age <= 64) {
        return 34;
    }
    if (age <= 70) {
        return 10;
    }

    return 0;
}

function scoreExperience(experience) {

    if (experience < 0) {
        return 0;
    }

    if (experience <= 1.5) {
        return 14;
    }
    if (experience <= 10) {
        return 27;
    }
    if (experience <= 20) {
        return 34;
    }
    if (experience > 20) {
        return 34;
    }

    return 0;
}

const COLLATERAL_TYPE_FLAT = 'flat';
const COLLATERAL_TYPE_HOUSE = 'house';
const COLLATERAL_TYPE_LAND_PLOT = 'land plot';
const COLLATERAL_TYPE_CAR = 'car';
const COLLATERAL_TYPE_NO_COLLATERAL = 'noCollateral';

function scoreCollateralType(collateral) {
    switch (collateral) {
        case COLLATERAL_TYPE_FLAT:
            return 47;
        case COLLATERAL_TYPE_HOUSE:
            return 42;
        case COLLATERAL_TYPE_LAND_PLOT:
            return 32;
        case COLLATERAL_TYPE_CAR:
            return 47;
        case COLLATERAL_TYPE_NO_COLLATERAL:
            return 15;
        default:
            return 0;
    }
}

function scoreDeptLoad(deptLoad) {

    if (deptLoad < 0) {
        return 0;
    }

    if (deptLoad <= 0.1) {
        return 58;
    }
    if (deptLoad <= 0.5) {
        return 43;
    }
    if (deptLoad <= 0.7) {
        return 21;
    }
    if (deptLoad > 0.7) {
        return 10;
    }

    return 0;
}

function scoreOpenLoans(openLoans) {

    if (openLoans < 0) {
        return 0;
    }

    if (openLoans == 0) {
        return 40;
    }
    if (openLoans <= 2) {
        return 34;
    }
    if (openLoans <= 5) {
        return 15;
    }

    if (openLoans > 5) {
        return 3;
    }

    return 0;
}
