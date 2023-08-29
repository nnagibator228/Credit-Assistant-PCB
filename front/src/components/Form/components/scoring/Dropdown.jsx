import {FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

export const Dropdown = ({callbackType, callbackCnt, ...props}) => {
    const [type, setType] = useState('')
    const [cnt, setCnt] = useState('')

    const handleChangeType = (e) => {
        setType(e.target.value);
        callbackType(e.target.value);
    }

    const handleChangeCnt = (e) => {
        setCnt(e.target.value);
        callbackCnt(e.target.value);
    }

    return (
        <Grid container paddingTop={2}>
            <Grid item xl={8} md={8} xs={10}>
                <FormControl fullWidth>
                    <InputLabel required id="type">Вид обеспечения по кредиту</InputLabel>
                    <Select
                        required
                        color='warning'
                        labelId="type"
                        label="Вид обеспечения по кредиту"
                        value={type}
                        onChange={handleChangeType}
                    >
                        <MenuItem value="Квартира">Квартира</MenuItem>
                        <MenuItem value="Дом">Дом</MenuItem>
                        <MenuItem value="Земельный участок">Земельный участок</MenuItem>
                        <MenuItem value="Автомобиль">Автомобиль</MenuItem>
                        <MenuItem value="Без обеспечения">Без обеспечения</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item marginTop={2} xl={5} md={8} xs={10}>
                <FormControl fullWidth>
                    <InputLabel required id="cnt">Количество действующих кредитов</InputLabel>
                    <Select
                        required
                        color='warning'
                        labelId="cnt"
                        label="Количество действующих кредитов"
                        value={cnt}
                        onChange={handleChangeCnt}
                    >
                        <MenuItem value="2">1-2</MenuItem>
                        <MenuItem value="5">3-5</MenuItem>
                        <MenuItem value="6">5+</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}
