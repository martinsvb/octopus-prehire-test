import { ChangeEventHandler } from 'react';

export interface CurrencySearchActions {
    onCurrencySearchChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
