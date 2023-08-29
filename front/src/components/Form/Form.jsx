import React, {useState} from 'react'
import { Button, Grid } from '@mui/material'


import { Switches as SwitchesFilter } from './components/filters/Switches'
import { Sliders as SlidersFilter} from './components/filters/Sliders'
import { Dropdown as DropdownFilter } from './components/filters/Dropdown'
import {Sliders as SlidersScoring} from './components/scoring/Sliders'
import {Dropdown as DropdownScoring} from './components/scoring/Dropdown'
import { TextFields as TextFieldsScoring } from './components/scoring/TextFields'

export const Form = ({callbackForm, ...props}) => {
  const [payments, setPayments] = useState(0)
  const [income, setIncome] = useState(0)
  const [age, setAge] = useState(1)
  const [exp, setExp] = useState(1)
  const [type, setType] = useState('')
  const [cnt, setCnt] = useState('')
  const [dev, setDev] = useState(false)
  const [military, setMilitary] = useState(false)
  const [pensioner, setPensioner] = useState(false)
  const [amount, setAmount] = useState(50000)
  const [terms, setTerms] = useState(1)
  const [purpose, setPurpose] = useState('')


  const callbackPayments = (value) => setPayments(value)
  const callbackIncome = (value) => setIncome(value)
  const callbackAge = (value) => setAge(value)
  const callbackExp = (value) => setExp(value)
  const callbackType = (value) => setType(value)
  const callbackCnt = (value) => setCnt(value)
  const callbackDev = (value) => setDev(value)
  const callbackMilitary = (value) => setMilitary(value)
  const callbackPensioner = (value) => setPensioner(value)
  const callbackAmount = (value) => setAmount(value)
  const callbackTerms = (value) => setTerms(value)
  const callbackPurpose = (value) => setPurpose(value)

  const confirm = () => {
    const data = {"monthlyCreditPayments": payments,
      "max_months": terms,
      "age": age,
      "experience": exp,
      "monthlyIncome": income,
      "collateralType": type,
      "openLoans": cnt,
      "dev": dev,
      "military": military,
      "pensioner": pensioner,
      "max_sum": amount,
      "purpose": purpose,}

      callbackForm(data)
  }

  return (
      <>
       <Grid 
          item
          marginTop={2}
          marginLeft={2}
          marginRight={2} 
          padding={2} 
          xl={6} md={10} xs={10}
        >
          <Grid container justifyContent={'center'}>
          <SlidersFilter
            callbackAmount = {callbackAmount}
            callbackTerms = {callbackTerms}
          />
            <Grid item xl={12} md={12} xs={12}>
              <DropdownFilter
                callbackPurpose = {callbackPurpose}
              />
              <SwitchesFilter
                callbackDev = {callbackDev}
                callbackMilitary = {callbackMilitary}
                callbackPensioner = {callbackPensioner}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid 
          item
          padding={2} 
          xl={6} md={10} xs={10}
        >
          <SlidersScoring
            callbackAge={callbackAge}
            callbackExp={callbackExp}
          />
          <DropdownScoring
            callbackType={callbackType}
            callbackCnt={callbackCnt}
          />
          <TextFieldsScoring 
            callbackIncome={callbackIncome}
            callbackPayments={callbackPayments}
          />
          <Grid 
          paddingTop={2}
          item 
          xl={12} md={10} xs={12} 
          justifyContent={'center'}
          >
            <Button 
              color='warning' 
              variant='contained' 
              onClick={confirm}
            >Найти подходящие варианты</Button>
          </Grid>
        </Grid>
      </>
  )
}
