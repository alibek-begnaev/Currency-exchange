import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import useAxios from 'axios-hooks'


export default function Homepage() {
    const inputRef1 = React.useRef();
    const inputRef2 = React.useRef();

    const [currency1, setCurrency1] = React.useState('usd');
    const [currency2, setCurrency2] = React.useState('uah');
    const [currencies, setCurrencies] = React.useState();
    const [amount, setAmount] = React.useState();
    const [focuced, setFocuced] = React.useState();
    const [
        { data: getData, loading: getLoading, error }
      ] = useAxios(
        {
          url: `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1}.json`,
          method: 'GET'
        },
       
      )
      React.useEffect(()=>{
        if(getData){
            setCurrencies(getData)
        }
      },[getData])
    const currency = [
        {
            title:"USD",
            type: "usd",
            rate: currencies && currencies[currency1]?.usd
        },
        {
            title:"EUR",
            type: "eur",
            rate: currencies && currencies[currency1]?.eur
        },
        {
            title:"UAH",
            type: "uah",
            rate: currencies && currencies[currency1]?.uah
        },
    ]
    console.log(getData?.usd)
console.log("currr:", currency)
    const handleChangeCur1 = (event) => {
        setCurrency1(event.target.value);
        
    };
    const handleChangeCur2 = (event) => {
        setCurrency2(event.target.value);
    };
    const handleConverter = (event) => {
        
        setAmount(event.target.value)
       
    }

    const onFocus =(e)=>{
        
        setFocuced(e.target.name)
        
    }
    const calculateValue1 = (currencyType) =>{
        const result = amount && currency.filter(i=>i.type===currencyType).map(item=> amount / item.rate)
        console.log("OnFocus", focuced)
        return result
    }
    const calculateValue = (currencyType) =>{
        const result = amount && currency.filter(i=>i.type===currencyType).map(item=> item.rate * amount)
        console.log("OnFocus", focuced)
        return result
    }

  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Header />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Currency Exchange
        </Typography>
        
      </Container>
      
      <Container maxWidth="md" component="main">
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
                 <Grid container>
                    <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select</InputLabel>
                        <Select
                            value={currency1}
                            label="Select"
                            onChange={handleChangeCur1}
                        >
                            {currency.map((item, index)=> 
                                <MenuItem 
                                    disabled={item.type===currency2} //if you don't want to disable selected currencies, delete or commit this line
                                    key={index} 
                                    value={item.type}>
                                        {item.title}
                                </MenuItem>)}
                            
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField fullWidth name="input1" onFocus={onFocus} inputRef={inputRef1} onChange={handleConverter} value={focuced==='input1' ? inputRef1.value : calculateValue1(currency2)}  variant="outlined" />
                    </Grid>
                    </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                 <Grid container> 
                    <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select</InputLabel>
                        <Select
                            value={currency2}
                            label="Select"
                            onChange={handleChangeCur2}
                        >
                            {currency.map((item, index)=> 
                                <MenuItem 
                                    disabled={item.type===currency1} //if you don't want to disable selected currencies, delete or commit this line
                                    key={index} 
                                    value={item.type}>
                                        {item.title}
                                </MenuItem>)}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField fullWidth name="input2" onFocus={onFocus} inputRef={inputRef2} onChange={handleConverter}   value={focuced==='input2' ? inputRef2.value : calculateValue(currency2)} variant="outlined" />
                    </Grid>
                    </Grid>
            </Grid>
        </Grid>
      </Container>
    
    

    </>
  );
}