import React from "react";
import LevelModal from "../components/LevelModal";

import { BASE_CURRENCY, DEALING_CURRENCIES } from "../config";
import AppContext from "../context/app-context";
import { getAllCurrencies } from "../utils/currency-helpers";

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
    current_currency: CurrencyObject,
    popup: {
      isOpen: boolean,
    }
    selectedProduct: string | null
    
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
            },
            popup: {
              isOpen: false,
            },
            selectedProduct: null
          };
        this.changeCurrency = this.changeCurrency.bind(this);
        this.onPopupClose = this.onPopupClose.bind(this);
        this.onPopupOpen = this.onPopupOpen.bind(this);
        this.selectProduct = this.selectProduct.bind(this);
    }
  onPopupClose = () => this.setState(prev => ({...prev,  popup: {isOpen: false}}))
  onPopupOpen = () => this.setState(prev => ({...prev,  popup: {isOpen: true}}))
  selectProduct = (product_id: string) => {
    this.setState(prev => ({...prev, selectedProduct: product_id}))
    this.onPopupOpen();
  };
  changeCurrency = (code: string) => {
    const findCurrency = this.state.currency_rates?.find( rate => rate.code == code);
    if(!findCurrency) throw new Error("Currency not found");
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
          changeCurrency: this.changeCurrency,
          onPopupClose: this.onPopupClose,
          onPopupOpen: this.onPopupOpen,
          selectProduct: this.selectProduct
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
