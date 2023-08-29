import {React, useState} from 'react'
import { Grid, Slider, Typography } from '@mui/material'

export const Sliders = ({callbackAge, callbackExp,...props}) => {
  const [age, setAge] = useState(1)
  const [exp, setExp] = useState(1)

  const handleChangeAge = (e) => {
    setAge(e.target.value)
    callbackAge(e.target.value)
  }


  const handleChangeExp = (e) => {
    setExp(e.target.value)
    callbackExp(e.target.value)
  }


  return (
    <>
      <Grid container>
        <Grid item xl={12} md={12} xs={12} textAlign={'center'}>
            <Slider
                color='warning' 
                valueLabelDisplay="auto" 
                marks 
                min={18}
                max={100}
                value={age}
                onChange={handleChangeAge}
            />
            <Typography>Ваш возраст</Typography>
        </Grid>
      </Grid>
      <Grid container>
          <Grid item xl={12} md={12} xs={12} textAlign={'center'}>
              <Slider
                  color='warning' 
                  valueLabelDisplay="auto" 
                  marks 
                  min={1}
                  max={50}
                  value={exp}
                  onChange={handleChangeExp}
              />
              <Typography>Ваш стаж работы</Typography>
          </Grid>
          
      </Grid>
    </>
  )
}
