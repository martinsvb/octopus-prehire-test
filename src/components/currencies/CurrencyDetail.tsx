import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CurrencyRates } from '../../model/currencies';
import { ReducersContext } from '../../reducers/provider';

export const CurrencyDetail: React.FC = () => {

  const { state: { currencyR: { currency } } } = React.useContext(ReducersContext);

  const [ currencyLoading, setCurrencyLoading ] = React.useState(false);

  const [ currencyLoadingError, setCurrencyLoadingError ] = React.useState('');

  const [ currencyData, setCurrencyData ] = React.useState<CurrencyRates>([]);

  const [ currencyAverageRate, setCurrencyAverageRate ] = React.useState('');

  React.useEffect(
    () => {
        setCurrencyLoading(true);
        setCurrencyLoadingError('');
        setCurrencyData([]);
        const loadCurrencytimeout = setTimeout(
            () => {
                import(`../../data/${currency.code.toLowerCase()}.json`)
                    .then(({rates}: Readonly<{rates: CurrencyRates}>) => {
                        setCurrencyLoading(false);
                        setCurrencyData([...rates]);
                        const ratesSum = rates.reduce((acc, rate) => acc + rate, 0);
                        setCurrencyAverageRate((ratesSum / rates.length).toFixed(2));
                    })
                    .catch((error) => {
                        setCurrencyLoadingError('Currency load failed');
                    });
            }, 
            1000
        );

        return () => {
            clearTimeout(loadCurrencytimeout);
        }
    },
    [currency],
  );

  return (
    <Box sx={{ mt: 2 }}>
        {!!currency.code &&
          <React.Fragment>
            <Typography
              sx={{ mb: 2 }}
              variant="h5"
            >
              Detail {currency.country}
            </Typography>
            {!!currencyData.length ?
              <TableContainer component={Paper}>
                <Table aria-label="Currency info">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2">Code</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={currency.code} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2">Average Rate</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={currencyAverageRate} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              :
              currencyLoading ?
                  <CircularProgress />
                  :
                  !!currencyLoadingError &&
                    <Alert severity="error">{currencyLoadingError}</Alert>
            }
          </React.Fragment>
        }
    </Box>
  );
}
