import { createContext, useContext, useState } from 'react'
import { findCurrency, getAllCurrencies } from '../utils/currency-helpers'


type ICurrency = { code: string, rate: number }
type CurrencyProviderProps = { children: React.ReactNode }

interface ICurrencyContext {
    currency: {
        code: string
        rate: number
    }
    dispatch?: (code: string) => void;
}

const defaultCurrencyState = {
    currency: {
        code: process.env.BASE_CURRENCY ?? 'AUD',
        rate: 1
    },
}

export const CurrencyContext = createContext<ICurrencyContext>(defaultCurrencyState)


function CurrencyProvider({ children }: CurrencyProviderProps) {
    const [currency, setCurrency] = useState({
        code: process.env.BASE_CURRENCY ?? 'AUD',
        rate: 0
    })

    const updateCurrency = async (code:string) => {
        // const result = await findCurrency(code);
    }
    
    return (
        <CurrencyContext.Provider value={{ currency, dispatch: (code) => updateCurrency(code)}}>
            { children }
        </CurrencyContext.Provider>
    );
}

function useCurrency() {
    const context = useContext(CurrencyContext)
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider')
    }
    return context
}


export { CurrencyProvider, useCurrency }