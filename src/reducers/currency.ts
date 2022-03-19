import { Currency } from '../model/currencies';

export enum CURRENCY_ACTION_TYPES {
    SET_CURRENCY_CODE = 'setCurrencyCode'
}

export interface SelectedCurrencyAction {
    type: CURRENCY_ACTION_TYPES.SET_CURRENCY_CODE;
    payload: {
        currency: Currency;
    }
}

export interface CurrencyReducer {
    currency: Currency;
}

export const initialCurrencyState: CurrencyReducer = {
    currency: {
        code: '',
        country: '',
    },
};

export const currencyReducer = (state: CurrencyReducer, action: SelectedCurrencyAction) => {
    switch (action.type) {
        case CURRENCY_ACTION_TYPES.SET_CURRENCY_CODE:
            return {
                ...state,
                currency: {...action.payload.currency},
            };

        default:
            throw new Error();
    }
}
