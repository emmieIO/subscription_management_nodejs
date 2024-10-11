const axios = require('axios');
require('dotenv').configDotenv();

const paystackApi = {
    secret_key: process.env.PAYSTACK_SECRET_KEY,
    base_url: 'https://api.paystack.co',
    makeRequest: async function(method, endpoint, data={}){
        const headers = {
            'Authorization': `Bearer ${paystackApi.secret_key}`,
            'Content-Type': 'application/json',
        }
        try{
            const response = await axios({
                method,
                url: `${paystackApi.base_url}${endpoint}`,
                headers,
                data
            })
            return response.data
        }catch(e){
            throw e
        }

    }
}

module.exports = paystackApi;