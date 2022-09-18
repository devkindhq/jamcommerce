import { DEALING_CURRENCIES } from './../config/index';
import SupaBase from './supabaseClient'


async function findCurrency(code: string){
    const currency_rate = await SupaBase.from("currency_rates").select('*').eq('code', code).order('updated_at', { ascending: false }).limit(1).single();
    return currency_rate
}


async function getAllCurrencies(){
    return await SupaBase.from("currency_rates").select('*').in('code', DEALING_CURRENCIES).order('updated_at', { ascending: false }).limit(DEALING_CURRENCIES.length);
}

export { findCurrency, getAllCurrencies }