import { Grid, Slider, Typography } from '@mui/material'
import React, { useState } from 'react'

export const Sliders = ({callbackAmount, callbackTerms, ...props}) => {
  const [amount, setAmount] = useState(50000)
  const [terms, setTerms] = useState(1)

  const handleChangeAmount = (e) => {
    setAmount(e.target.value)
    callbackAmount(e.target.value)
  }


  const handleChangeTerms = (e) => {
    setTerms(e.target.value)
    callbackTerms(e.target.value)
  }

  return (
    <>
      <Grid container>
        <Grid item xl={12} md={12} xs={12} textAlign={'center'}>
            <Slider
                color='warning' 
                valueLabelDisplay="auto" 
                marks 
                step={50000}
                min={50000}
                max={5000000}
                value={amount}
                onChange={handleChangeAmount}
            />
            <Typography>Сумма кредитования</Typography>
        </Grid>
      </Grid>
      <Grid container>
          <Grid item xl={12} md={12} xs={12} textAlign={'center'}>
              <Slider
                  color='warning' 
                  valueLabelDisplay="auto" 
                  marks 
                  min={1}
                  max={25}
                  value={terms}
                  onChange={handleChangeTerms}
              />
              <Typography>Срок кредитования</Typography>
          </Grid>
      </Grid>
    </>
  )
}
