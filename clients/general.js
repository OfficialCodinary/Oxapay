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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var ajv_1 = require("ajv");
var fs_1 = require("fs");
var path_1 = require("path");
var ajv = new ajv_1.default({ allErrors: true });
/**
 * A class representing a client for interacting with the Oxapay Merchant API.
 */
var ClientGeneral = /** @class */ (function () {
    function ClientGeneral() {
        this.apiBaseURL = "https://api.oxapay.com/";
        this.methods = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'methodInfos.json')).toString()).General;
    }
    ClientGeneral.prototype.request = function (method, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.apiBaseURL).concat(this.methods[method].path), reqData || {})];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error(err_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * The endpoint allows users to retrieve the list of blockchain networks supported by OxaPay for cryptocurrency transactions.
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    ClientGeneral.prototype.supportedNetworks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('supportedNetworks')];
            });
        });
    };
    /**
    * This API request will return a comprehensive list of supported currencies and their network details, including symbols, names, and withdrawal information. You can use this data to understand which networks are available for each currency, such as Bitcoin on the Bitcoin network, Ethereum on the Ethereum network, and so on.
    *
    * By utilizing this API endpoint, you can stay up-to-date with the latest information on supported currencies and their respective networks, ensuring smooth and accurate transactions on OxaPay.
    *
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    ClientGeneral.prototype.supportedCurrencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('supportedCurrencies')];
            });
        });
    };
    /**
     * This API request will return a comprehensive list of supported fiat currencies and their price. Each currency is represented by a key-value pair, where the key is the currency code (e.g., USD, AUD) and the value is an object containing details such as symbol, name, price, and display precision.
     *
     * This data can be used to populate a user interface and allows merchants to create invoices using fiat currencies.
     *
     * @returns {Promise<object>} - A promise that resolves with the API response data.
     * @throws {Error} - If there's an error during the API call.
     */
    ClientGeneral.prototype.supportedFiatCurrencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('supportedFiatCurrencies')];
            });
        });
    };
    /**
     * The endpoint allows users to obtain real-time exchange rates for cryptocurrency pairs supported by OxaPay. This feature is particularly useful for applications that require up-to-date cryptocurrency prices.
     * @param {object} reqData
     * @param {string} reqData.fromCurrency - The source currency for the exchange rate (type: string).
     * @param {string} reqData.toCurrency - The target currency for the exchange rate (type: string).
     * @returns {Promise<object>} - A promise that resolves with the exchange rate response data.
     * @throws {Error} - If there's an error during the API call.
     */
    ClientGeneral.prototype.exchangeRate = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('exchangeRate', reqData)];
            });
        });
    };
    /**
     * This endpoint helps you instantly know how much cryptocurrency you'll get when exchanging from one type to another. Perfect for anyone interested in cryptocurrency, this feature is super easy to use. Just plug it into your app, and you'll always have the latest exchange rates at your fingertips. Whether you're buying or selling, the endpoint makes it simple to calculate the amount you'll receive in your desired cryptocurrency.
     * @param {object} reqData
     * @param {string} reqData.fromCurrency - The source currency for the exchange rate (type: string).
     * @param {string} reqData.toCurrency - The target currency for the exchange rate (type: string).
     * @param {number} reqData.amount - The amount to be exchanged (type: float).
     * @returns {Promise<object>} - A promise that resolves with the exchange rate response data.
     * @throws {Error} - If there's an error during the API call.
     */
    ClientGeneral.prototype.exchangeCalculate = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('exchangeCalculate', reqData)];
            });
        });
    };
    /**
     * Easily access a comprehensive list of exchangeable cryptocurrencies along with their minimum conversion amounts. This resource reveals the available options for the `fromCurrency` and `toCurrency` fields when conducting cryptocurrency conversions. Whether you're exchanging Bitcoin for Tether or Tether for Litecoin, this list provides valuable insights into the supported pairs and ensures seamless transactions with the specified minimum conversion amount.
     * @returns {Promise<object>} - A promise that resolves with the exchange pairs response data.
     * @throws {Error} - If there's an error during the API call.
     */
    ClientGeneral.prototype.exchangePairs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('exchangePairs')];
            });
        });
    };
    /**
    * By using this endpoint, you can instantly retrieve the current prices of all crypto currencies supported by OxaPay.
    * @returns {Promise<object>} - A promise that resolves with cryptocurrency price data.
    * @throws {Error} - If there's an error during the API call.
    */
    ClientGeneral.prototype.cryptoPrices = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('cryptoPrices')];
            });
        });
    };
    /**
    * The endpoint allows users to check the current state of the OxaPay API. By making a request to this endpoint, users can verify if the API is functioning correctly
    * @returns {Promise<{string}>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    ClientGeneral.prototype.systemStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('systemStatus')];
            });
        });
    };
    return ClientGeneral;
}());
exports.default = ClientGeneral;
