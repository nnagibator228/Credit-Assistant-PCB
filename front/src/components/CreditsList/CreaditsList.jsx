import { Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import React from 'react'

export const CreaditsList = ({credits}) => {
  return (
    <Grid 
      item
      marginTop={2}
      marginLeft={2}
      marginRight={2} 
      padding={2} 
      xl={6} md={10} xs={10}
    >
      {credits.map((credit) => (
        <Grid item key={credit.id} sx={{ padding: 2, margin : 5 }}>
          <Paper elevation={3} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Банк {credit.bank_name}</TableCell>
                            <TableCell align="right">{credit.credit_name}</TableCell>
                            <TableCell align="right">{credit.type}</TableCell>
                            <TableCell align="right">{credit.description}</TableCell>
                            <TableCell align="right">Ставка: {credit.percent} Сумма: {credit.maxAmount} Срок: {credit.max_months / 12} года</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
