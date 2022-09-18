import React, { createContext } from "react";

import { getAllCurrencies } from "../utils/currency-helpers";
import { BASE_CURRENCY, DEALING_CURRENCIES } from "../config";
import AppContext from "../context/app-context";

interface IAppProviderProps {
    children: React.ReactNode
}
export type CurrencyObject = {
    code: string,
    value: number
}
export interface IAppProviderState {
    base_currency: CurrencyObject,
    dealing_currencies: string[],
    currency_rates: CurrencyObject[] | any[] | undefined,
    current_currency: CurrencyObject
}

class AppProvider extends React.Component<IAppProviderProps, IAppProviderState> {
    constructor(props: any){
        super(props);
        this.state = {
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
          };
        this.changeCurrency = this.changeCurrency.bind(this);
    }
  changeCurrency = (code: string) => {
    const findCurrency = this.state.currency_rates.find( rate => rate.code == code);
    const foundCurrency = findCurrency ?? this.state.current_currency;
    this.setState(prev => ({
        ...prev,
        current_currency: foundCurrency
    }))
  }
  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          changeCurrency: this.changeCurrency
        }}
      >
        <div>{this.props.children}</div>
      </AppContext.Provider>
    );
  }

  componentDidMount = async () => {
    try {
      const currencies = await getAllCurrencies();
      this.setState(prev => ({ ...prev, currency_rates: currencies.data }));
    } catch (err) {
      console.log(err);
    }
  };
}

export default AppProvider;
