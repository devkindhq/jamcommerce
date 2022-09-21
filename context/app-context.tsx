import { createContext } from "react";
import { BASE_CURRENCY, DEALING_CURRENCIES } from "../config";
import { IAppProviderState } from "../providers/app-provider";

type AppContext = {
    state: IAppProviderState,
    changeCurrency: (code: string) => void
    onPopupClose: () => void
    onPopupOpen: () => void
}
const AppContext = createContext<AppContext>({
    state: {
        base_currency: {
            code: BASE_CURRENCY,
            value: 1
        },
        dealing_currencies: DEALING_CURRENCIES,
        currency_rates: [{
            code: BASE_CURRENCY,
            value: 1
        }],
        current_currency: {
            code: BASE_CURRENCY,
            value: 1
        },
        popup: {
            isOpen: false
        }
    },
    changeCurrency: () => (console.log('currency function not initiated')),
    onPopupClose: () => (console.log('on close not initialised')),
    onPopupOpen: () => (console.log('on open not initialised'))
});

export default AppContext;
