import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAxios from 'axios-hooks'



export default function Header(){
  const [
    { data: getData, loading: getLoading, error }
  ] = useAxios(
    {
      url: `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json`,
      method: 'GET'
    },
   
  )
  const usd = getData?.usd?.uah
  const eur = getData?.usd?.uah / getData?.usd?.eur
    return(
        <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            CurrEx-ALI
          </Typography>
          <div> 
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
               1 USD: {usd?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} UAH
            </Typography>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
               1 EUR: {eur?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} UAH
            </Typography>

          </div>
         
          
        </Toolbar>
      </AppBar>
    )
}