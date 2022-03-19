import { Currency } from "../../model/currencies";

export interface CurrenciesApiResponse {
    currencies: Readonly<Array<Currency>>;
};
