import axios from "axios";
import Ajv from 'ajv';
import { readFileSync } from "fs";
import { join } from 'path';
const ajv = new Ajv({ allErrors: true })

/**
 * A class representing a client for interacting with the Oxapay Merchant API.
 */
class ClientGeneral {

    private apiBaseURL = "https://api.oxapay.com/";
    private methods = JSON.parse(readFileSync(join(__dirname, 'methodInfos.json')).toString()).General

    private async request(method: 'supportedNetworks' | 'supportedCurrencies' | 'supportedFiatCurrencies' | 'exchangeRate' | 'exchangeCalculate' | 'exchangePairs' | 'cryptoPrices' | 'systemStatus', reqData?: object) {
        try {
            const response = await axios.post(`${this.apiBaseURL}${this.methods[method].path}`, reqData || {});
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    /**
    * The endpoint allows users to retrieve the list of blockchain networks supported by OxaPay for cryptocurrency transactions.
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async supportedNetworks(): Promise<{
        result: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 135 | 500
        message: string;
        data: string[]
    }> {
        return this.request('supportedNetworks');
    }

    /**
    * This API request will return a comprehensive list of supported currencies and their network details, including symbols, names, and withdrawal information. You can use this data to understand which networks are available for each currency, such as Bitcoin on the Bitcoin network, Ethereum on the Ethereum network, and so on.
    * 
    * By utilizing this API endpoint, you can stay up-to-date with the latest information on supported currencies and their respective networks, ensuring smooth and accurate transactions on OxaPay.
    * 
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async supportedCurrencies(): Promise<{
        result: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 135 | 500
        message: string;
        data: {
            [key: string]: {
                symbol: string;
                name: string;
                status: boolean;
                networkList: {
                    [key: string]: {
                        minConfirm: number;
                        withdrawFee: number;
                        withdrawMin: number;
                        depositMin: number;
                        staticFixedFee: number;
                    }
                }
            }
        }
    }> {
        return this.request('supportedCurrencies');
    }

    /**
     * This API request will return a comprehensive list of supported fiat currencies and their price. Each currency is represented by a key-value pair, where the key is the currency code (e.g., USD, AUD) and the value is an object containing details such as symbol, name, price, and display precision.
     * 
     * This data can be used to populate a user interface and allows merchants to create invoices using fiat currencies.
     * 
     * @returns {Promise<object>} - A promise that resolves with the API response data.
     * @throws {Error} - If there's an error during the API call.
     */
    async supportedFiatCurrencies(): Promise<{
        result: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 135 | 500
        message: string;
        data: {
            [key: string]: {
                symbol: string;
                name: string;
                price: number;
                displayPrecision: number;
            }
        }
    }> {
        return this.request('supportedFiatCurrencies');
    }

    /**
     * The endpoint allows users to obtain real-time exchange rates for cryptocurrency pairs supported by OxaPay. This feature is particularly useful for applications that require up-to-date cryptocurrency prices.
     * @param {object} reqData
     * @param {string} reqData.fromCurrency - The source currency for the exchange rate (type: string).
     * @param {string} reqData.toCurrency - The target currency for the exchange rate (type: string). 
     * @returns {Promise<object>} - A promise that resolves with the exchange rate response data.
     * @throws {Error} - If there's an error during the API call.
     */

    async exchangeRate(reqData: {
        fromCurrency: string;
        toCurrency: string;
    }): Promise<{
        result: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 135 | 500
        message: string;
        rate: number;
    }> {
        return this.request('exchangeRate', reqData);
    }

    /**
     * This endpoint helps you instantly know how much cryptocurrency you'll get when exchanging from one type to another. Perfect for anyone interested in cryptocurrency, this feature is super easy to use. Just plug it into your app, and you'll always have the latest exchange rates at your fingertips. Whether you're buying or selling, the endpoint makes it simple to calculate the amount you'll receive in your desired cryptocurrency.
     * @param {object} reqData
     * @param {string} reqData.fromCurrency - The source currency for the exchange rate (type: string).
     * @param {string} reqData.toCurrency - The target currency for the exchange rate (type: string).
     * @param {number} reqData.amount - The amount to be exchanged (type: float).
     * @returns {Promise<object>} - A promise that resolves with the exchange rate response data.
     * @throws {Error} - If there's an error during the API call.
     */
    async exchangeCalculate(reqData: {
        fromCurrency:
        string; toCurrency: string;
        amount: number;
    }): Promise<{
        result: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 135 | 500
        message: string,
        rate: string
        amount: string,
        toAmount: string
    }> {
        return this.request('exchangeCalculate', reqData);
    }

    /**
     * Easily access a comprehensive list of exchangeable cryptocurrencies along with their minimum conversion amounts. This resource reveals the available options for the `fromCurrency` and `toCurrency` fields when conducting cryptocurrency conversions. Whether you're exchanging Bitcoin for Tether or Tether for Litecoin, this list provides valuable insights into the supported pairs and ensures seamless transactions with the specified minimum conversion amount.
     * @returns {Promise<object>} - A promise that resolves with the exchange pairs response data.
     * @throws {Error} - If there's an error during the API call.
     */
    async exchangePairs(): Promise<{
        result: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 135 | 500
        message: string;
        data: {
            fromCurrency: string;
            toCurrency: string;
            minAmount: number;
        }[]
    }> {
        return this.request('exchangePairs');
    }

    /**
    * By using this endpoint, you can instantly retrieve the current prices of all crypto currencies supported by OxaPay.
    * @returns {Promise<object>} - A promise that resolves with cryptocurrency price data.
    * @throws {Error} - If there's an error during the API call.
    */
    async cryptoPrices(): Promise<{
        result: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 135 | 500
        message: string;
        data: {
            [key: string]: number;
        }
    }> {
        return this.request('cryptoPrices');
    }

    /**
    * The endpoint allows users to check the current state of the OxaPay API. By making a request to this endpoint, users can verify if the API is functioning correctly
    * @returns {Promise<{string}>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async systemStatus(): Promise<string> {
        return this.request('systemStatus');
    }

}

export default ClientGeneral;