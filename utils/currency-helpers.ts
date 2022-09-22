import { CurrencyObject } from '../providers/app-provider';
import { DEALING_CURRENCIES } from './../config/index';
import SupaBase from './supabaseClient'


async function findCurrency(code: string){
    const currency_rate = await SupaBase.from("currency_rates").select('*').eq('code', code).order('updated_at', { ascending: false }).limit(1).single();
    return currency_rate
}


async function getAllCurrencies(){
    return await SupaBase.from("currency_rates").select('*').in('code', DEALING_CURRENCIES).order('updated_at', { ascending: false }).limit(DEALING_CURRENCIES.length);
}

const convertCurrencyAmount = (amount: number, base_currency: CurrencyObject, destination_currency: CurrencyObject): number => {
    return (amount * base_currency.value) * destination_currency.value;
}

export { findCurrency, getAllCurrencies, convertCurrencyAmount }