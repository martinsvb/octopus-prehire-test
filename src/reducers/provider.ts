import { createContext, Dispatch } from 'react';
import { CurrencyReducer, currencyReducer, initialCurrencyState, SelectedCurrencyAction } from './currency';

export interface InitState {
    currencyR: CurrencyReducer;
};

export const initState = {
    currencyR: initialCurrencyState,
};

export const ReducersContext = createContext<{
  state: InitState;
  dispatch: Dispatch<SelectedCurrencyAction>;
}>({
  state: initState,
  dispatch: () => null,
});

export const mainReducer = (
  { currencyR }: InitState,
  action: SelectedCurrencyAction
) => ({
    currencyR: currencyReducer(currencyR, action),
});
