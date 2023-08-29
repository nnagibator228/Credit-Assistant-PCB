import React, { useState } from 'react'
import {FormControlLabel, Grid, Switch} from '@mui/material'

export const Switches = ({callbackDev, callbackMilitary, callbackPensioner, ...props}) => {
  const [dev, setDev] = useState(false)
  const [military, setMilitary] = useState(false)
  const [pensioner, setPensioner] = useState(false)
  const handleChangeDev = (e) => {
    setDev(e.target.checked)
    callbackDev(e.target.checked)
  }
  const handleChangeMilitary = (e) => {
    setMilitary(e.target.checked)
    callbackMilitary(e.target.checked)
  }
  const handleChangePensioner = (e) => {
    setPensioner(e.target.checked)
    callbackPensioner(e.target.checked)
  }
  return (
    <Grid 
      container 
      direction={'row'} 
      columnSpacing={2} 
      paddingTop={2}
    >
        <Grid item>
          <FormControlLabel 
            labelPlacement='bottom' 
            control={<Switch color='warning' 
            checked={dev} 
            onChange={handleChangeDev}/>} 
            label="IT-специалист" 
          />   
        </Grid>
        <Grid item>
          <FormControlLabel 
              labelPlacement='bottom' 
              control={<Switch color='warning' 
              checked={military} 
              onChange={handleChangeMilitary}/>} 
              label="Военный" 
            />     
        </Grid>
        <Grid item>
          <FormControlLabel 
              labelPlacement='bottom' 
              control={<Switch color='warning' 
              checked={pensioner} 
              onChange={handleChangePensioner}/>} 
              label="Пенсионер" 
            />      
        </Grid>
    </Grid>
  )
}
