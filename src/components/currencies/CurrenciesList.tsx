import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { CurrenciesApiResponse } from './CurrenciesListTyping';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { compare } from '../../helpers/data';
import { Currency } from '../../model/currencies';
import { CURRENCY_ACTION_TYPES } from '../../reducers/currency';
import { ReducersContext } from '../../reducers/provider';
import { CurrencySearch } from './CurrencySearch';

export const CurrenciesList: React.FC = () => {

    const [ currenciesLoading, setCurrenciesLoading ] = React.useState<boolean>(true);

    const [ currenciesLoadingError, setCurrenciesLoadingError ] = React.useState('');

    const [ currencySearchValue, setCurrencySearchValue ] = React.useState('');

    const [ selectedCurrencyIdx, setSelectedCurrencyIdx ] = React.useState<number | undefined>();

    const [ currenciesData, setCurrenciesData ] = React.useState<Array<Currency>>([]);

    const { dispatch } = React.useContext(ReducersContext);

    React.useEffect(
        () => {
            const loadCurrenciestimeout = setTimeout(
                () => {
                    import('../../data/currencies.json')
                        .then(({currencies}: CurrenciesApiResponse) => {
                            setCurrenciesLoading(false);
                            setCurrenciesData([...currencies].sort(compare('country', 'ASC')));
                        })
                        .catch((error) => {
                            setCurrenciesLoadingError('Currencies load failed');
                        });
                }, 
                1000
            );

            return () => {
                clearTimeout(loadCurrenciestimeout);
            }
        },
        [],
    );

    const onCurrencyClick = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const idx = Number(event.currentTarget.getAttribute('data-idx'));
            setSelectedCurrencyIdx(idx);
            dispatch({
                type: CURRENCY_ACTION_TYPES.SET_CURRENCY_CODE,
                payload: { currency: currenciesData[idx] },
            });
        },
        [currenciesData],
    )

    const onCurrencySearchChange = React.useCallback<
        React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    >(
        (event) => {
            setCurrencySearchValue(event.currentTarget.value.toLowerCase());
        },
        [],
    )

    return (
        <Box sx={{ mt: 2 }}>
            <CurrencySearch
                onCurrencySearchChange={onCurrencySearchChange}
            />
            {!!currenciesData.length ?
                <List aria-label='currencies' dense>
                    {currenciesData
                        .filter(({code, country}) => (
                            !currencySearchValue ||
                            code.toLowerCase().includes(currencySearchValue) ||
                            country.toLowerCase().includes(currencySearchValue)
                        ))
                        .map(({code, country}, idx) => (
                            <ListItemButton
                                data-idx={idx}
                                key={`${idx}_${code}`}
                                selected={selectedCurrencyIdx === idx}
                                onClick={onCurrencyClick}
                            >
                                <ListItemIcon>
                                    {code}
                                </ListItemIcon>
                                <ListItemText primary={country} />
                            </ListItemButton>
                        ))
                    }
                </List>
                :
                currenciesLoading ?
                    <CircularProgress />
                    :
                    !!currenciesLoadingError &&
                        <Alert severity="error">{currenciesLoadingError}</Alert>
            }
        </Box>
    );
}
