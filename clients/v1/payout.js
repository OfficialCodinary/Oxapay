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
        this.apiBaseURL = "https://api.oxapay.com/v1/payout";
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
            throw new Error(`Failed to load method information: ${err.message}`);
        });
    }
    request(method, reqData, explicitUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.initialization;
                const methodInfo = this.methods[method];
                if (!methodInfo)
                    throw new Error(`Method ${String(method)} not found in methodInfos.json`);
                const url = explicitUrl !== null && explicitUrl !== void 0 ? explicitUrl : `${this.apiBaseURL}${methodInfo.path}`;
                const response = yield (0, axios_1.default)({
                    method: methodInfo.reqType.toLowerCase(),
                    url,
                    headers: {
                        "merchant_api_key": this.apiKey,
                    },
                    data: Object.assign({}, reqData),
                });
                if (this.isDebug)
                    console.log(response.data);
                return response.data;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Request failed: ${err.message}`);
                }
                else {
                    throw new Error("Request failed with an unknown error");
                }
            }
        });
    }
    /**
     * Create a payout transaction.
     *
     * @param {object} reqData - The request data for creating a payout.
     * @returns {Promise<object>} - A promise that resolves with the payout transaction response data.
     */
    createPayout(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('generatePayout', reqData);
        });
    }
    /**
     * Retrieve payout transaction history with optional filtering and pagination.
     *
     * @param {object} reqData - The request data for retrieving payout transaction history.
     * @returns {Promise<object>} - A promise that resolves with the payout transaction history response data.
     */
    payoutHistory(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('payoutHistory', reqData);
        });
    }
    /**
     * Inquire about a payout using a specific track ID.
     *
     * @param {object} reqData - The request data for payout inquiry.
     * @returns {Promise<object>} - A promise that resolves with the payout inquiry response data.
     */
    payoutInfo(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodInfo = this.methods['payoutInfo'];
            const url = `${this.apiBaseURL}${methodInfo.path}/${reqData.trackId}`;
            return this.request('payoutInfo', reqData, url);
        });
    }
}
exports.default = ClientPayout;
