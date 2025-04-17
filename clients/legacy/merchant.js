"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const promises_1 = require("fs/promises");
const path_1 = require("path");
/**
 * A class representing a client for interacting with the Oxapay Merchant API.
 * @param {string} apiKey - The API key for authentication.
 * @param {boolean} debugLogger - A flag to enable/disable debug logging.
 * @example
 * const client = new ClientMerchant('your-api-key', true);
 * // or
 * const client = new ClientMerchant('your-api-key');
 */
class ClientMerchant {
    constructor(apiKey) {
        this.apiBaseURL = "https://api.oxapay.com/";
        this.apiKey = apiKey;
        this.initialization = (0, promises_1.readFile)((0, path_1.join)(__dirname, 'methodInfos.json'), 'utf-8')
            .then(data => {
            this.methods = JSON.parse(data).Merchant;
        })
            .catch(err => { throw new Error(err.message); });
    }
    request(method, reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.initialization;
                const response = yield axios_1.default.post(`${this.apiBaseURL}${this.methods[method].path}`, Object.assign({ merchant: this.apiKey }, reqData));
                return response.data;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    /**
    * Returns a list of allowed coins in merchant api.
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    allowedCoins() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('allowedCoins');
        });
    }
    /**
    * Create an invoice.
    * @param {object} reqData - The request data for the API call.
    * @param {integer} reqData.amount - Amount to be requested in the invoice (type: integer).
    * @param {string} reqData.currency - Currency of the request amount (type: string).
    * @param {integer} reqData.lifeTime - Lifetime or duration of the invoice (type: integer).
    * @param {0|1} reqData.feePaidByPayer - Fee paid by the payer (type: float).
    * @param {float} reqData.underPaidCover - Underpaid coverage (type: float).
    * @param {string} reqData.callbackUrl - URL for callback notifications (type: string).
    * @param {string} reqData.returnUrl - URL for redirection after completion (type: string).
    * @param {string} reqData.description - Description of the invoice (type: string).
    * @param {string} reqData.orderId - Order identifier (type: string).
    * @param {string} reqData.email - Email address (type: string).
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    createInvoice(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('createInvoice', reqData);
        });
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
    * @param {0|1} reqData.feePaidByPayer - Fee paid by the payer (type: float).
    * @param {float} reqData.underPaidCover - Underpaid coverage (type: float).
    * @param {string} reqData.callbackUrl - URL for callback notifications (type: string).
    * @param {string} reqData.description - Description of the invoice (type: string).
    * @param {string} reqData.orderId - Order identifier (type: string).
    * @param {string} reqData.email - Email address (type: string).
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    whiteLabel(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('whiteLabel', reqData);
        });
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
    createStaticAddress(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('createStaticAddress', reqData);
        });
    }
    /**
    * Revokes a static address for a merchant.
    *
    * @param {object} reqData - The request data for revoking a static address.
    * @param {string} reqData.address - The address to be revoked (type: string).
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    revokeStaticAddress(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('revokeStaticAddress', reqData);
        });
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
    exchangeRequest(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('exchangeRequest', reqData);
        });
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
    exchangeHistory(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('exchangeHistory', reqData);
        });
    }
    /**
    * Retrieve payment information for a merchant using a track ID.
    *
    * @param {object} reqData - The request data for retrieving payment information.
    * @param {integer} reqData.trackId - The track ID associated with the payment (type: integer).
    * @returns {Promise<object>} - A promise that resolves with the payment information response data.
    * @throws {Error} - If there's an error during the API call.
    */
    paymentInfo(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('paymentInfo', reqData);
        });
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
    * @param {0|1} reqData.feePaidByPayer - Fee paid by the payer for filtering (type: float).
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
    paymentHistory(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('paymentHistory', reqData);
        });
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
    exchangeRate(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('exchangeRate', reqData);
        });
    }
}
exports.default = ClientMerchant;
