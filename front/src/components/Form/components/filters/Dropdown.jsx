import {FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

export const Dropdown = ({callbackPurpose, ...props}) => {
    const [purpose, setPurpose] = useState('')

    const handleChange = (e) => {
        setPurpose(e.target.value);
        callbackPurpose(e.target.value);
    }

    return (
        <Grid container paddingTop={2}>
            <Grid item xl={6} md={8} xs={10}>
                <FormControl fullWidth>
                    <InputLabel required id="purpose">Цель кредитования</InputLabel>
                    <Select
                        required
                        color='warning'
                        labelId="purpose"
                        label="Цель кредитования"
                        value={purpose}
                        onChange={handleChange}
                    >
                        <MenuItem value="Покупка недвижимости">Покупка недвижимости</MenuItem>
                        <MenuItem value="Покупка автомобиля">Покупка автомобиля</MenuItem>
                        <MenuItem value="Другое">Другое</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}
