import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CurrenciesApiResponse } from './CurrenciesListTyping';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { compare } from '../../helpers/data';
import { Currency } from '../../model/currencies';
import { CurrencySearch } from './CurrencySearch';

export const CurrenciesList: React.FC = () => {

    const [ currenciesLoading, setCurrenciesLoading ] = React.useState<boolean>(true);

    const [ currenciesLoadingError, setCurrenciesLoadingError ] = React.useState<string>('');

    const [ currencySearchValue, setCurrencySearchValue ] = React.useState<string>('');

    const [ selectedCurrencyIdx, setSelectedCurrencyIdx ] = React.useState<number | undefined>();

    const [ currenciesData, setCurrenciesData ] = React.useState<Array<Currency>>([]);

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
            const code = event.currentTarget.getAttribute('data-code');
            const idx = event.currentTarget.getAttribute('data-idx');
            setSelectedCurrencyIdx(Number(idx));
            console.log({code, idx});
        },
        [],
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
        <Box>
            <Typography
                variant='h4'
            >
                Currencies list
            </Typography>
            <CurrencySearch
                onCurrencySearchChange={onCurrencySearchChange}
            />
            {!!currenciesData.length ?
                <List aria-label='currencies'>
                    {currenciesData
                        .filter(({code, country}) => (
                            !currencySearchValue ||
                            code.toLowerCase().includes(currencySearchValue) ||
                            country.toLowerCase().includes(currencySearchValue)
                        ))
                        .map(({code, country}, idx) => (
                            <ListItemButton
                                data-code={code}
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
                        <Typography
                            variant='body1'
                        >
                            {currenciesLoadingError}
                        </Typography>
            }
        </Box>
    );
}
