const axios = require("axios");
const Ajv = require('ajv');
const ajv = new Ajv({})
const fs = require("fs")

/**
 * A class representing a client for interacting with the Oxapay Merchant API.
 */
class ClientGeneral {

    #apiBaseURL = "https://api.oxapay.com/";
    #methods = JSON.parse(fs.readFileSync("./methodInfos.json")).General

    async #request(method) {
        try {
            const response = await axios.post(`${this.#apiBaseURL}${this.#methods[method].path}`, {});
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    /**
    * Returns a list of allowed Networks.
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async supportedNetworks() {
        return this.#request('supportedNetworks');
    }

    /**
    * Returns a list of allowed currencies.
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    async supportedCurrencies() {
        return this.#request('supportedCurrencies');
    }

    /**
    * Retrieve cryptocurrency prices.
    *
    * @returns {Promise<object>} - A promise that resolves with cryptocurrency price data.
    * @throws {Error} - If there's an error during the API call.
    */
    async cryptoPrices() {
        return this.#request('cryptoPrices');
    }
    
    /**
    * Returns the status of the oxapay server.
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
    #methods = JSON.parse(fs.readFileSync("./methodInfos.json")).Merchant
    #apiKey;
    constructor(apiKey) {
        this.#apiKey = apiKey;
    }

    async #request(method, reqData) {
        try {
            if (reqData) {
                var validator = ajv.compile(this.#methods[method].schema)
                if (!(await validator(reqData))) {
                    console.log('ERROR: Invalid data!');
                    return
                }
            }
            const response = await axios.post(`${this.#apiBaseURL}${this.#methods[method].path}`, {
                merchant: this.#apiKey,
                ...reqData,
            });
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
    * @param {string} reqData.currency - Currency of the request amount (type: string).
    * @param {string} reqData.payCurrency - Currency for payment (type: string).
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

    async whiteLabel(reqData = {}) {
        return this.#request('whiteLabel', reqData);
    }

    /**
    * Create a static address for a merchant.
    *
    * @param {object} reqData - The request data for creating a static address.
    * @param {string} reqData.currency - The currency used for the static address (type: string).
    * @param {string} reqData.Network - The name or identifier of the network (type: string).
    * @param {string} requData.callbackUrl - The URL for callback notifications (type: string).
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
    #methods = JSON.parse(fs.readFileSync("./methodInfos.json")).Payout
    #apiKey;
    constructor(apiKey) {
        this.#apiKey = apiKey;
    }

    async #request(method, reqData) {
        try {
            if (reqData) {
                var validator = ajv.compile(this.#methods[method].schema)
                if (!(await validator(reqData))) {
                    console.log('ERROR: Invalid data!');
                    return
                }
            }
            const response = await axios.post(`${this.#apiBaseURL}${this.#methods[method].path}`, {
                key: this.#apiKey,
                ...reqData,
            });
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
    * @param {string} reqData.currency - The currency of the payout amount (type: string).
    * @param {string} reqData.callbackUrl - The URL for callback notifications (type: string).
    * @param {string} reqData.description - Description of the payout (type: string).
    * @returns {Promise<object>} - A promise that resolves with the payout transaction response data.
    * @throws {Error} - If there's an error during the API call.
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
    * @param {object} requestData - The request data for payout inquiry.
    * @param {string} requestData.currency - The currency for the payout inquiry (type: string).
    * @param {number} requestData.trackId - The track ID associated with the payout (type: number).
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