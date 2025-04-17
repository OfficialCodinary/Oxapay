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
 * A class representing a client for interacting with the Oxapay General API.
 */
class ClientGeneral {
    constructor() {
        this.apiBaseURL = "https://api.oxapay.com/v1/general/";
        this.initialization = (0, promises_1.readFile)((0, path_1.join)(__dirname, "methodInfos.json"), "utf-8")
            .then((data) => {
            this.methods = JSON.parse(data).Common;
        })
            .catch((err) => {
            throw new Error(`Failed to load method information: ${err.message}`);
        });
    }
    request(method, reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.initialization;
                const methodInfo = this.methods[method];
                if (!methodInfo)
                    throw new Error(`Method ${String(method)} not found in methodInfos.json`);
                const url = `${this.apiBaseURL}${methodInfo.path}`;
                const response = yield (0, axios_1.default)({
                    method: methodInfo.reqType.toLowerCase(),
                    url,
                    data: reqData || {},
                });
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
     * Retrieve the list of blockchain networks supported by OxaPay.
     * @returns {Promise<object>} - A promise that resolves with the API response data.
     */
    supportedNetworks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("supportedNetworks");
        });
    }
    /**
     * Retrieve a comprehensive list of supported currencies and their network details.
     * @returns {Promise<object>} - A promise that resolves with the API response data.
     */
    supportedCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("supportedCurrencies");
        });
    }
    /**
     * Retrieve a list of supported fiat currencies and their prices.
     * @returns {Promise<object>} - A promise that resolves with the API response data.
     */
    supportedFiatCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("supportedFiatCurrencies");
        });
    }
    /**
     * Retrieve the real-time exchange rate for a cryptocurrency pair.
     * @param {object} reqData - The request data.
     * @param {string} reqData.fromCurrency - The source currency.
     * @param {string} reqData.toCurrency - The target currency.
     * @returns {Promise<object>} - A promise that resolves with the exchange rate data.
     */
    exchangeRate(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("exchangeRate", reqData);
        });
    }
    /**
     * Calculate the amount of cryptocurrency you'll receive when exchanging.
     * @param {object} reqData - The request data.
     * @param {string} reqData.fromCurrency - The source currency.
     * @param {string} reqData.toCurrency - The target currency.
     * @param {number} reqData.amount - The amount to exchange.
     * @returns {Promise<object>} - A promise that resolves with the calculated exchange data.
     */
    exchangeCalculate(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("exchangeCalculate", reqData);
        });
    }
    /**
     * Retrieve a list of exchangeable cryptocurrency pairs and their minimum conversion amounts.
     * @returns {Promise<object>} - A promise that resolves with the exchange pairs data.
     */
    exchangePairs() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("exchangePairs");
        });
    }
    /**
     * Retrieve the current prices of all cryptocurrencies supported by OxaPay.
     * @returns {Promise<object>} - A promise that resolves with the cryptocurrency prices.
     */
    cryptoPrices() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("prices");
        });
    }
    /**
     * Check the current state of the OxaPay API.
     * @returns {Promise<string>} - A promise that resolves with the API status.
     */
    systemStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("systemStatus");
        });
    }
}
exports.default = ClientGeneral;
