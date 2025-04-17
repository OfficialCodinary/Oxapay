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
 */
class ClientGeneral {
    constructor() {
        this.apiBaseURL = "https://api.oxapay.com/";
        this.initialization = (0, promises_1.readFile)((0, path_1.join)(__dirname, 'methodInfos.json'), 'utf-8')
            .then(data => {
            this.methods = JSON.parse(data).General;
        })
            .catch(err => { throw new Error(err.message); });
    }
    request(method, reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.initialization;
                const response = yield axios_1.default.post(`${this.apiBaseURL}${this.methods[method].path}`, reqData || {});
                return response.data;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    /**
    * The endpoint allows users to retrieve the list of blockchain networks supported by OxaPay for cryptocurrency transactions.
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    supportedNetworks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('supportedNetworks');
        });
    }
    /**
    * This API request will return a comprehensive list of supported currencies and their network details, including symbols, names, and withdrawal information. You can use this data to understand which networks are available for each currency, such as Bitcoin on the Bitcoin network, Ethereum on the Ethereum network, and so on.
    *
    * By utilizing this API endpoint, you can stay up-to-date with the latest information on supported currencies and their respective networks, ensuring smooth and accurate transactions on OxaPay.
    *
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    supportedCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('supportedCurrencies');
        });
    }
    /**
     * This API request will return a comprehensive list of supported fiat currencies and their price. Each currency is represented by a key-value pair, where the key is the currency code (e.g., USD, AUD) and the value is an object containing details such as symbol, name, price, and display precision.
     *
     * This data can be used to populate a user interface and allows merchants to create invoices using fiat currencies.
     *
     * @returns {Promise<object>} - A promise that resolves with the API response data.
     * @throws {Error} - If there's an error during the API call.
     */
    supportedFiatCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('supportedFiatCurrencies');
        });
    }
    /**
     * The endpoint allows users to obtain real-time exchange rates for cryptocurrency pairs supported by OxaPay. This feature is particularly useful for applications that require up-to-date cryptocurrency prices.
     * @param {object} reqData
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
    /**
     * This endpoint helps you instantly know how much cryptocurrency you'll get when exchanging from one type to another. Perfect for anyone interested in cryptocurrency, this feature is super easy to use. Just plug it into your app, and you'll always have the latest exchange rates at your fingertips. Whether you're buying or selling, the endpoint makes it simple to calculate the amount you'll receive in your desired cryptocurrency.
     * @param {object} reqData
     * @param {string} reqData.fromCurrency - The source currency for the exchange rate (type: string).
     * @param {string} reqData.toCurrency - The target currency for the exchange rate (type: string).
     * @param {number} reqData.amount - The amount to be exchanged (type: float).
     * @returns {Promise<object>} - A promise that resolves with the exchange rate response data.
     * @throws {Error} - If there's an error during the API call.
     */
    exchangeCalculate(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('exchangeCalculate', reqData);
        });
    }
    /**
     * Easily access a comprehensive list of exchangeable cryptocurrencies along with their minimum conversion amounts. This resource reveals the available options for the `fromCurrency` and `toCurrency` fields when conducting cryptocurrency conversions. Whether you're exchanging Bitcoin for Tether or Tether for Litecoin, this list provides valuable insights into the supported pairs and ensures seamless transactions with the specified minimum conversion amount.
     * @returns {Promise<object>} - A promise that resolves with the exchange pairs response data.
     * @throws {Error} - If there's an error during the API call.
     */
    exchangePairs() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('exchangePairs');
        });
    }
    /**
    * By using this endpoint, you can instantly retrieve the current prices of all crypto currencies supported by OxaPay.
    * @returns {Promise<object>} - A promise that resolves with cryptocurrency price data.
    * @throws {Error} - If there's an error during the API call.
    */
    cryptoPrices() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('cryptoPrices');
        });
    }
    /**
    * The endpoint allows users to check the current state of the OxaPay API. By making a request to this endpoint, users can verify if the API is functioning correctly
    * @returns {Promise<{string}>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    systemStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('systemStatus');
        });
    }
}
exports.default = ClientGeneral;
