import SupaBase from './supabaseClient'


async function FindCurrency(code: string){
    const currency_rate = await SupaBase.from("currency_rates").select('*').eq('code', code.toUpperCase()).order('updated_at', { ascending: false }).limit(1).single();

    return currency_rate
}

export { FindCurrency }