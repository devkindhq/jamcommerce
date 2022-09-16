import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)


// Accepts the array and key
const groupBy = (array: [], key: string) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
};


const getAllCurrencies = async () => {
  return await supabase.from('currency_rates').select('*');
}

const findCurrency = async (currency:string) => {
  const allCurrenciesRates =  await getAllCurrencies();
  return allCurrenciesRates.data.find(currencyRate => currencyRate.code === currency);
 
}

const convertToBase = async (base_currency: string, currency: string, amount: number, dest_currency: string) => {
  let destination_currency = await findCurrency(dest_currency);
  console.log(base_currency, currency, dest_currency)
  if(base_currency.toLowerCase() == currency.toLowerCase()) {
    return {
      base_currency: base_currency,
      currency: currency,
      request_amount: amount,
      converted_amount: amount,
      destination_currency: destination_currency.value * amount
    }
  }

  let currencyValue = base_currency.toUpperCase()+currency.toUpperCase();
  let currencyRate = await supabase.from("currency_rates").select('*').eq('currency', currencyValue).order('updated_at', {ascending: true}).limit(1).single();
  var converted_amount = destination_currency.code == currency ? amount : ( amount / currencyRate?.data?.value);
  let calculated_destination_currency = destination_currency.value < 1 ? converted_amount / destination_currency.value  : destination_currency.value * converted_amount
  
  if(currency.toLowerCase() == dest_currency.toLowerCase()){
    var converted_amount = ( amount / currencyRate?.data?.value);
    return {
      base_currency: base_currency,
      currency: currency,
      request_amount: amount,
      converted_amount: converted_amount,
      destination_currency: amount
    }
  }

  return {
    base_currency: base_currency,
    currency: currency,
    request_amount: amount,
    converted_amount: converted_amount,
    destination_currency: calculated_destination_currency
  }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    try {
        const {destination_currency} = req.query;

        
    
        const result = await supabase.from('checkout_sessions').select('*').eq('payment_status', 'paid');
        const groupedCurrency = groupBy(result.data, 'currency');
        const allCurrencies = Object.keys(groupedCurrency);
        const currency =  allCurrencies.map( currency => {
            let currentCurrencies = groupedCurrency[currency];
            let amounts = currentCurrencies.map(e => (e.amount_total));
            let total = amounts.reduce((prev, current) => prev+current, 0);
            let conversion = convertToBase('AUD', currency.toUpperCase(), total, destination_currency).then(e => { return e});;
            return {
              currency: currency,
              total: total,
              conversion: conversion,
              total_transactions: currentCurrencies.length
          }
        });


      let bringConvertedRates = () => currency.map( async e=> {
        let conversion = await e.conversion;
          return {
            ...e,
            conversion: conversion
          }
       })
 
       var details = await Promise.all(bringConvertedRates());
  
        const finalResult = {
            details: details,

            base_currency_total: 1000
        }
                        
        
      res.status(200).json(finalResult)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
        res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  }
  