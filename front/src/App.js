import { Grid } from '@mui/material';
import './App.css';

import { Form } from './components/Form/Form';
import { CatalogService } from './services/catalog.service';
import { CreaditsList } from './components/CreditsList/CreaditsList';

function App() {

  const callbackForm = (value) => {
    CatalogService.getCatalog(value)
  }


  return (
    <div className="App">
      <Grid container direction={'row'} justifyContent={'center'}>
        <Form callbackForm={callbackForm}/>
      </Grid>
      <CreaditsList/>
    </div>
  );
}

export default App;
