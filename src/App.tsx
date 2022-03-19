import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container/Container';
import React from 'react';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { CurrenciesList } from './components/currencies/CurrenciesList';
import { CurrencyRates } from './components/currencies/CurrencyRates';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: '100vh' }}>
          <Header />
          <Content
            mainContentCmp={<CurrenciesList />}
            secondContentCmp={<CurrencyRates />}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
