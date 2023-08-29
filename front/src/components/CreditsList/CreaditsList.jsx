import { Grid } from '@mui/material'
import React from 'react'

export const CreaditsList = ({credits}) => {
    credits = [
        {
            id: 1,
            bank_name: "ПСБ",
            type: "Потреб",
            credit_name: "Супер крутой кредит",
            description: "Кредит очень крутой, честно",
            percent: "100%",
            maxAmount: "10.000.000",
            max_months: "12",
        },
        {
            id: 2,
            bank_name: "ПСБ",
            type: "Потреб",
            credit_name: "Супер крутой кредит2 ",
            description: "Кредит очень крутой, честно 2",
            percent: "110%",
            maxAmount: "1.000.000",
            max_months: "24",
        }
    ]
  return (
    <Grid container direction={'column'}>
    {credits.map(credit => (
        <Grid item key={credit.id} xl={12}>
            <h1>Банк {credit.bank_name}</h1>
            <h3>{credit.credit_name}</h3>
            <h4>{credit.type}</h4>
            <p>{credit.description}</p>
            <p>Ставка: {credit.percent} Сумма: {credit.max_sum} Срок: {credit.max_months / 12}</p>
        </Grid>
    ))}
    </Grid>
  )
}
