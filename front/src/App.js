import { useState } from 'react';
import { Grid } from '@mui/material';
import './App.css';

import { Form } from './components/Form/Form';
import { CatalogService } from './services/catalog.service';
import { CreaditsList } from './components/CreditsList/CreaditsList';

function App() {

  const [creditsData, setCreditsData] = useState([]);

  const callbackForm = (value) => {
    CatalogService.getCatalog(value)
      .then((data) => {
        setCreditsData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <div className="App">
      <Grid container direction={'row'} justifyContent={'center'}>
        <Form callbackForm={callbackForm}/>
      </Grid>
      <CreaditsList credits={creditsData}/>
    </div>
  );
}

export default App;
