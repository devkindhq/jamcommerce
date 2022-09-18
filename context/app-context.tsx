import { createContext } from "react";
import { BASE_CURRENCY, DEALING_CURRENCIES } from "../config";
import { IAppProviderState } from "../providers/app-provider";

type AppContext = {
    state: IAppProviderState,
    changeCurrency: (code: string) => void
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
        }
    },
    changeCurrency: () => (console.log('currency function not initiated'))
});

export default AppContext;
