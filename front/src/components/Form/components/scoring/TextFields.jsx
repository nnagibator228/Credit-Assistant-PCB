import React, { useState } from 'react'
import { FormControl, Grid, InputLabel, TextField } from '@mui/material';

export const TextFields = ({callbackPayments, callbackIncome, ...props}) => {
  const [payments, setPayments] = useState(0)
  const [income, setIncome] = useState(0)

  const handleChangePayments = (e) => {
    setPayments(e.target.value)
    callbackPayments(e.target.value)
  }

  const handleChangeIncome = (e) => {
    setIncome(e.target.value)
    callbackIncome(e.target.value)
  }

  return (
    <Grid container>
        <Grid item xl={6} xs={12}  paddingTop={2} paddingRight={2}>
          <InputLabel required>Сумма ежемесячных платежей по кредитам</InputLabel>
          <FormControl fullWidth>
            <TextField 
              required 
              onChange={handleChangePayments}
              value={payments}
            />
          </FormControl>
        </Grid>
        <Grid item paddingTop={2}>
          <InputLabel required>Ежемесячный доход</InputLabel>
          <TextField 
            required 
            onChange={handleChangeIncome}
            value={income}
          />
        </Grid>
    </Grid>
  )
}
