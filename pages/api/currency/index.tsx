
import { NextApiRequest, NextApiResponse } from 'next'



export default async function fetchCurrencies(req: NextApiRequest, res: NextApiResponse ) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("apikey", process.env.CURRENCY_API_KEY);
        // Default options are marked with *
        const url = process.env.CURRENCY_API_ENDPOINT + "currencies";
        const response = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: myHeaders,
            redirect: 'follow'
        })

        const result = await response.json();
        
        return res.send(result)
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message)
        }
    }
}