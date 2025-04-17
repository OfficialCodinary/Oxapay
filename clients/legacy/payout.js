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
 * Create a new client for interacting with the Oxapay Merchant API.
 * @param {string} apiKey - The API key for the Oxapay Merchant API.
 * @param {boolean} debugLogger - A flag to enable/disable debug logging.
 * @example
 * const client = new ClientPayout('your-api-key', true);
 * // or
 * const client = new ClientPayout('your-api-key');
*/
class ClientPayout {
    constructor(apiKey, debugLogger = false) {
        this.apiBaseURL = "https://api.oxapay.com/";
        this.apiKey = apiKey;
        this.isDebug = debugLogger;
        if (!apiKey)
            throw new Error('API key is required');
        if (typeof debugLogger !== 'boolean')
            throw new Error('Debug logger must be a boolean');
        this.initialization = (0, promises_1.readFile)((0, path_1.join)(__dirname, 'methodInfos.json'), 'utf-8')
            .then(data => {
            this.methods = JSON.parse(data).Payout;
        })
            .catch(err => {
            throw new Error(err.message);
        });
    }
    request(method, reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.initialization;
                const response = yield axios_1.default.post(`${this.apiBaseURL}${this.methods[method].path}`, Object.assign({ key: this.apiKey }, reqData));
                if (this.isDebug)
                    console.log(response);
                return response.data;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
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
    * @returns {Promise<{object}>} - A promise that resolves with the payout transaction response data.
    * @throws {Error} - If there's an error during the API call/parameters.
    */
    createPayout(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('createPayout', reqData);
        });
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
    payoutHistory(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('payoutHistory', reqData);
        });
    }
    /**
    * Retrieve the account balance for a specific currency.
    *
    * @param {object} reqData - The request data for retrieving the account balance.
    * @param {string} reqData.currency - The currency for which the balance is requested (type: string).
    * @returns {Promise<object>} - A promise that resolves with the account balance response data.
    * @throws {Error} - If there's an error during the API call.
    */
    accountBalance(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('accountBalance', reqData);
        });
    }
    /**
    * Inquire about a payout using a specific currency and track ID.
    *
    * @param {object} reqData - The request data for payout inquiry.
    * @param {number} reqData.trackId - The track ID associated with the payout (type: number).
    * @returns {Promise<object>} - A promise that resolves with the payout inquiry response data.
    * @throws {Error} - If there's an error during the API call.
    */
    payoutInquiry(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('payoutInquiry', reqData);
        });
    }
}
exports.default = ClientPayout;
