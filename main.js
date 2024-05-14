const axios = require("axios");
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true })
const fs = require("fs")
const path = require('path');

/**
 * A class representing a client for interacting with the Oxapay Merchant API.
 */
class ClientGeneral {

    #apiBaseURL = "https://api.oxapay.com/";
    #methods = JSON.parse(fs.readFileSync(path.join(__dirname, 'methodInfos.json'))).General

    async #request(method) {
        try {
            const response = await axios.post(`${this.#apiBaseURL}${this.#methods[method].path}`, {});
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
    async supportedNetworks() {
        return this.#request('supportedNetworks');
    }

    /**
    * This API request will return a comprehensive list of supported currencies and their network details, including symbols, names, and withdrawal information. You can use this data to understand which networks are available for each currency, such as Bitcoin on the Bitcoin network, Ethereum on the Ethereum network, and so on.
    * 
    * By utilizing this API endpoint, you can stay up-to-date with the latest information on supported currencies and their respective networks, ensuring smooth and accurate transactions on OxaPay.
    * 
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async supportedCurrencies() {
        return this.#request('supportedCurrencies');
    }

    /**
     * This API request will return a comprehensive list of supported fiat currencies and their price. Each currency is represented by a key-value pair, where the key is the currency code (e.g., USD, AUD) and the value is an object containing details such as symbol, name, price, and display precision.
     * 
     * This data can be used to populate a user interface and allows merchants to create invoices using fiat currencies.
     * 
     * @returns {Promise<object>} - A promise that resolves with the API response data.
     * @throws {Error} - If there's an error during the API call.
     */
    async supportedFiatCurrencies() {
        return this.#request('supportedFiatCurrencies');
    }

    /**
     * The endpoint allows users to obtain real-time exchange rates for cryptocurrency pairs supported by OxaPay. This feature is particularly useful for applications that require up-to-date cryptocurrency prices.
     * @param {object} reqData
     * @param {string} reqData.fromCurrency - The source currency for the exchange rate (type: string).
     * @param {string} reqData.toCurrency - The target currency for the exchange rate (type: string). 
     * @returns {Promise<object>} - A promise that resolves with the exchange rate response data.
     * @throws {Error} - If there's an error during the API call.
     */

    async exchangeRate(reqData = {}) {
        return this.#request('exchangeRate', reqData);
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
    async exchangeCalculate(reqData = {}) {
        return this.#request('exchangeCalculate', reqData);
    }

    /**
     * Easily access a comprehensive list of exchangeable cryptocurrencies along with their minimum conversion amounts. This resource reveals the available options for the `fromCurrency` and `toCurrency` fields when conducting cryptocurrency conversions. Whether you're exchanging Bitcoin for Tether or Tether for Litecoin, this list provides valuable insights into the supported pairs and ensures seamless transactions with the specified minimum conversion amount.
     * @returns {Promise<object>} - A promise that resolves with the exchange pairs response data.
     * @throws {Error} - If there's an error during the API call.
     */
    async exchangePairs() {
        return this.#request('exchangePairs');
    }

    /**
    * By using this endpoint, you can instantly retrieve the current prices of all crypto currencies supported by OxaPay.
    * @returns {Promise<object>} - A promise that resolves with cryptocurrency price data.
    * @throws {Error} - If there's an error during the API call.
    */
    async cryptoPrices() {
        return this.#request('cryptoPrices');
    }

    /**
    * The endpoint allows users to check the current state of the OxaPay API. By making a request to this endpoint, users can verify if the API is functioning correctly
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async systemStatus() {
        return this.#request('systemStatus');
    }

}

class ClientMerchant {
    /**
    * Creates a new instance of the Merchant .
    * @param {string} apiKey - The API key for authentication.
    */
    #apiBaseURL = "https://api.oxapay.com/";
    #methods = JSON.parse(fs.readFileSync(path.join(__dirname, 'methodInfos.json'))).Merchant
    #apiKey;
    #isDebug;
    constructor(apiKey, debugLogger = false) {
        this.#apiKey = apiKey;
        this.#isDebug = debugLogger;
    }

    async #request(method, reqData) {
        try {
            if (reqData) {
                var validator = ajv.compile(this.#methods[method].schema)
                var valid = await validator(reqData)
                if (!valid) throw new Error(JSON.stringify(validator.errors, null, 2))

            }
            const response = await axios.post(`${this.#apiBaseURL}${this.#methods[method].path}`, {
                merchant: this.#apiKey,
                ...reqData,
            });
            if (this.#isDebug) console.log(response)
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }
    /**
    * Returns a list of allowed coins in merchant api.
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async allowedCoins() {
        return this.#request('allowedCoins');
    }

    /**
    * Create an invoice.
    * @param {object} reqData - The request data for the API call.
    * @param {integer} reqData.amount - Amount to be requested in the invoice (type: integer).
    * @param {string} reqData.currency - Currency of the request amount (type: string).
    * @param {integer} reqData.lifeTime - Lifetime or duration of the invoice (type: integer).
    * @param {float} reqData.feePaidByPayer - Fee paid by the payer (type: float).
    * @param {float} reqData.underPaidCover - Underpaid coverage (type: float).
    * @param {string} reqData.callbackUrl - URL for callback notifications (type: string).
    * @param {string} reqData.returnUrl - URL for redirection after completion (type: string).
    * @param {string} reqData.description - Description of the invoice (type: string).
    * @param {string} reqData.orderId - Order identifier (type: string).
    * @param {string} reqData.email - Email address (type: string).
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */

    async createInvoice(reqData = {}) {
        return this.#request('createInvoice', reqData);
    }

    /**
    * Creates an White Labeled invoice.
    * It returns a detailed information of the invoice
    * @param {object} reqData - The request data for the API call.
    * @param {integer} reqData.amount - Amount to be requested in the invoice (type: integer).
    * @param {string} reqData.network - Network of the request amount (type: string).
    * @param {string} reqData.currency - Currency of the request amount (type: string).
    * @param {string} reqData.payCurrency - Currency for payment (type: string).
    * @param {integer} reqData.lifeTime - Lifetime or duration of the invoice (type: integer).
    * @param {float} reqData.feePaidByPayer - Fee paid by the payer (type: float).
    * @param {float} reqData.underPaidCover - Underpaid coverage (type: float).
    * @param {string} reqData.callbackUrl - URL for callback notifications (type: string).
    * @param {string} reqData.description - Description of the invoice (type: string).
    * @param {string} reqData.orderId - Order identifier (type: string).
    * @param {string} reqData.email - Email address (type: string).
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */

    async whiteLabel(reqData = {}) {
        return this.#request('whiteLabel', reqData);
    }

    /**
    * Create a static address for a merchant.
    *
    * @param {object} reqData - The request data for creating a static address.
    * @param {string} reqData.currency - The currency used for the static address (type: string).
    * @param {string} reqData.network - The name or identifier of the network (type: string).
    * @param {string} reqData.callbackUrl - The URL for callback notifications (type: string).
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */

    async createStaticAddress(reqData) {
        return this.#request('createStaticAddress', reqData);
    }

    /**
    * Revokes a static address for a merchant.
    *
    * @param {object} reqData - The request data for revoking a static address.
    * @param {string} reqData.address - The address to be revoked (type: string).
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async revokeStaticAddress(reqData = {}) {
        return this.#request('revokeStaticAddress', reqData);
    }

    /**
    * Effortlessly initiate currency conversions for a specific amount from one cryptocurrency to another in real-time, receiving your desired currency at the prevailing global market price. To explore the available conversion options, refer to the [exchange pairs](https://docs.oxapay.com/api-reference/exchange-pairs) endpoint, which provides a comprehensive list of supported currency pairs for seamless transactions. Whether you're swapping Bitcoin for Tether or Tether for Litecoin, this feature ensures quick and accurate conversions at the current market rates.
    * @param {object} reqData - The request data for the exchange request.
    * @param {string} reqData.fromCurrency - The source currency for the exchange (type: string).
    * @param {string} reqData.toCurrency - The target currency for the exchange (type: string).
    * @param {number} reqData.amount - The amount to be exchanged (type: float).
    * @returns {Promise<object>} - A promise that resolves with the exchange request response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async exchangeRequest(reqData = {}) {
        return this.#request('exchangeRequest', reqData);
    }

    /**
     * Use this endpoint to retrieve a list of exchange transactions for a specific business. The list can be filtered by various criteria, such as time range, currency, type (autoConvert or manualSwap or swapByApi), and more. Pagination is also available to fetch the results in smaller sets.
     * 
     * @param {object} reqData - The request data for retrieving exchange history.
     * @param {string} reqData.orderBy - Display the list in ascending or descending order. Possible values: 'asc', 'desc' [default 'desc'].
     * @param {string} reqData.sortBy - Sort the received list by a parameter. Set to 'create_date' by default. Possible values: 'create_date', 'pay_date', 'amount' [default 'create_date'].
     * @param {string} reqData.page - The page number of the results you want to retrieve. Possible values: from 1 to the total number of pages - default 1.
     * @param {string} reqData.size - Number of records to be displayed on one page. Possible values: from 1 to 200 - default 10.
     * @param {string} reqData.type - Filter exchanges based on type (autoConvert or manualSwap or swapByApi).
     * @param {string} reqData.toCurrency - Specify the [currency symbol](https://docs.oxapay.com/api-reference/supported-currencies) for filtering exchanges in a specific toCurrency.
     * @param {string} reqData.fromCurrency - Specify the [currency symbol](https://docs.oxapay.com/api-reference/supported-currencies) for filtering exchanges in a specific fromCurrency.
     * @param {string} reqData.fromDate - Filter exchanges by the start date. The date format should be in unix format.
     * @param {string} reqData.toDate - Filter exchanges by the end date. The date format should be in unix format.
     * @param {string} reqData.trackId - Filter exchanges by trackId.
     * @returns {Promise<object>} - A promise that resolves with the exchange history response data.
     * @throws {Error} - If there's an error during the API call.
     */

    async exchangeHistory(reqData = {}) {
        return this.#request('exchangeHistory', reqData);
    }

    /**
    * Retrieve payment information for a merchant using a track ID.
    *
    * @param {object} reqData - The request data for retrieving payment information.
    * @param {integer} reqData.trackId - The track ID associated with the payment (type: integer).
    * @returns {Promise<object>} - A promise that resolves with the payment information response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async paymentInfo(reqData = {}) {
        return this.#request('paymentInfo', reqData);
    }

    /**
    * Retrieve payment history for a merchant with optional filtering and pagination.
    *
    * @param {object} reqData - The request data for retrieving payment history.
    * @param {string} reqData.fromDate - Start date for filtering payments (type: string).
    * @param {string} reqData.toDate - End date for filtering payments (type: string).
    * @param {number} reqData.fromAmount - Minimum payment amount for filtering (type: float).
    * @param {number} reqData.toAmount - Maximum payment amount for filtering (type: float).
    * @param {string} reqData.currency - Currency for payment filtering (type: string).
    * @param {string} reqData.payCurrency - Payment currency for filtering (type: string).
    * @param {string} reqData.network - Network name for filtering (type: string).
    * @param {string} reqData.address - Address for filtering (type: string).
    * @param {string} reqData.type - Payment type for filtering (type: string).
    * @param {number} reqData.feePaidByPayer - Fee paid by the payer for filtering (type: float).
    * @param {string} reqData.status - Payment status for filtering (type: string).
    * @param {string} reqData.orderId - Order identifier for filtering (type: string).
    * @param {number} reqData.size - Number of results per page (type: integer).
    * @param {number} reqData.page - Page number for pagination (type: integer).
    * @param {number} reqData.trackId - Track ID for filtering (type: integer).
    * @param {string} reqData.sortBy - Field to sort by (type: string).
    * @param {string} reqData.orderBy - Sorting order (type: string).
    * @returns {Promise<object>} - A promise that resolves with the payment history response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async paymentHistory(reqData = {}) {
        return this.#request('paymentHistory', reqData);
    }

    /**
    * Retrieve the exchange rate between two currencies.
    *
    * @param {object} reqData - The request data for retrieving the exchange rate.
    * @param {string} reqData.fromCurrency - The source currency for the exchange rate (type: string).
    * @param {string} reqData.toCurrency - The target currency for the exchange rate (type: string).
    * @returns {Promise<object>} - A promise that resolves with the exchange rate response data.
    * @throws {Error} - If there's an error during the API call.
    */

    async exchangeRate(reqData = {}) {
        return this.#request('exchangeRate', reqData);
    }
}

class ClientPayout {
    #apiBaseURL = "https://api.oxapay.com/";
    #methods = JSON.parse(fs.readFileSync(path.join(__dirname, 'methodInfos.json'))).Payout
    #apiKey;
    #isDebug;
    constructor(apiKey, debugLogger = false) {
        this.#apiKey = apiKey;
        this.#isDebug = debugLogger;
    }

    async #request(method, reqData) {
        try {
            if (reqData) {
                var validator = ajv.compile(this.#methods[method].schema)
                var valid = await validator(reqData)
                if (!valid) throw new Error(JSON.stringify(validator.errors, null, 2))
            }
            const response = await axios.post(`${this.#apiBaseURL}${this.#methods[method].path}`, {
                key: this.#apiKey,
                ...reqData,
            });
            if (this.#isDebug) console.log(response)
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    /**
    * Create a payout transaction.
    *
    * @param {object} reqData - The request data for creating a payout.
    * @param {string} reqData.address - The recipient's address for the payout (type: string).
    * @param {number} reqData.amount - The amount to be paid out (type: float).
    * @param {string} reqData.network - The network for the payout transaction (type: string).
    * @param {string} reqData.currency - The currency of the payout amount (type: string).
    * @param {string} reqData.callbackUrl - The URL for callback notifications (type: string).
    * @param {string} reqData.description - Description of the payout (type: string).
    * @returns {Promise<object>} - A promise that resolves with the payout transaction response data.
    * @throws {Error} - If there's an error during the API call/parameters.
    */

    async createPayout(reqData = {}) {
        return this.#request('createPayout', reqData);
    }

    /**
    * Retrieve payout transaction history with optional filtering and pagination.
    *
    * @param {object} reqData - The request data for retrieving payout transaction history.
    * @param {integer} reqData.fromDate - Start date for filtering payouts (type: integer).
    * @param {integer} reqData.toDate - End date for filtering payouts (type: integer).
    * @param {number} reqData.fromAmount - Minimum payout amount for filtering (type: float).
    * @param {number} reqData.toAmount - Maximum payout amount for filtering (type: float).
    * @param {string} reqData.currency - Currency for payout filtering (type: string).
    * @param {string} reqData.type - Payout type for filtering (type: string).
    * @param {string} reqData.network - Network name for filtering (type: string).
    * @param {string} reqData.status - Payout status for filtering (type: string).
    * @param {number} reqData.size - Number of results per page (type: integer).
    * @param {number} reqData.page - Page number for pagination (type: integer).
    * @param {string} reqData.sortBy - Field to sort by (type: string).
    * @param {string} reqData.orderBy - Sorting order (type: string).
    * @returns {Promise<object>} - A promise that resolves with the payout transaction history response data.
    * @throws {Error} - If there's an error during the API call.
    */

    async payoutHistory(reqData = {}) {
        return this.#request('payoutHistory', reqData);
    }

    /**
    * Retrieve the account balance for a specific currency.
    *
    * @param {object} reqData - The request data for retrieving the account balance.
    * @param {string} reqData.currency - The currency for which the balance is requested (type: string).
    * @returns {Promise<object>} - A promise that resolves with the account balance response data.
    * @throws {Error} - If there's an error during the API call.
    */

    async accountBalance(reqData) {
        return this.#request('accountBalance', reqData);
    }

    /**
    * Inquire about a payout using a specific currency and track ID.
    *
    * @param {object} reqData - The request data for payout inquiry.
    * @param {string} reqData.currency - The currency for the payout inquiry (type: string).
    * @param {number} reqData.trackId - The track ID associated with the payout (type: number).
    * @returns {Promise<object>} - A promise that resolves with the payout inquiry response data.
    * @throws {Error} - If there's an error during the API call.
    */

    async payoutInquiry(reqData) {
        return this.#request('payoutInquiry', reqData);
    }
}

module.exports = {
    General: ClientGeneral,
    Merchant: ClientMerchant,
    Payout: ClientPayout
};
