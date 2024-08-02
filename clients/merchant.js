"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var promises_1 = require("fs/promises");
var path_1 = require("path");
/**
 * A class representing a client for interacting with the Oxapay Merchant API.
 * @param {string} apiKey - The API key for authentication.
 * @param {boolean} debugLogger - A flag to enable/disable debug logging.
 * @example
 * const client = new ClientMerchant('your-api-key', true);
 * // or
 * const client = new ClientMerchant('your-api-key');
 */
var ClientMerchant = /** @class */ (function () {
    function ClientMerchant(apiKey) {
        var _this = this;
        this.apiBaseURL = "https://api.oxapay.com/";
        this.apiKey = apiKey;
        this.initialization = (0, promises_1.readFile)((0, path_1.join)(__dirname, 'methodInfos.json'), 'utf-8')
            .then(function (data) {
            _this.methods = JSON.parse(data).Merchant;
        })
            .catch(function (err) { throw new Error(err.message); });
    }
    ClientMerchant.prototype.request = function (method, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.initialization];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, axios_1.default.post("".concat(this.apiBaseURL).concat(this.methods[method].path), __assign({ merchant: this.apiKey }, reqData))];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error(err_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Returns a list of allowed coins in merchant api.
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    ClientMerchant.prototype.allowedCoins = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('allowedCoins')];
            });
        });
    };
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
    ClientMerchant.prototype.createInvoice = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('createInvoice', reqData)];
            });
        });
    };
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
    ClientMerchant.prototype.whiteLabel = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('whiteLabel', reqData)];
            });
        });
    };
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
    ClientMerchant.prototype.createStaticAddress = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('createStaticAddress', reqData)];
            });
        });
    };
    /**
    * Revokes a static address for a merchant.
    *
    * @param {object} reqData - The request data for revoking a static address.
    * @param {string} reqData.address - The address to be revoked (type: string).
    * @returns {Promise<object>} - A promise that resolves with the API response data.
    * @throws {Error} - If there's an error during the API call.
    */
    ClientMerchant.prototype.revokeStaticAddress = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('revokeStaticAddress', reqData)];
            });
        });
    };
    /**
    * Effortlessly initiate currency conversions for a specific amount from one cryptocurrency to another in real-time, receiving your desired currency at the prevailing global market price. To explore the available conversion options, refer to the [exchange pairs](https://docs.oxapay.com/api-reference/exchange-pairs) endpoint, which provides a comprehensive list of supported currency pairs for seamless transactions. Whether you're swapping Bitcoin for Tether or Tether for Litecoin, this feature ensures quick and accurate conversions at the current market rates.
    * @param {object} reqData - The request data for the exchange request.
    * @param {string} reqData.fromCurrency - The source currency for the exchange (type: string).
    * @param {string} reqData.toCurrency - The target currency for the exchange (type: string).
    * @param {number} reqData.amount - The amount to be exchanged (type: float).
    * @returns {Promise<object>} - A promise that resolves with the exchange request response data.
    * @throws {Error} - If there's an error during the API call.
    */
    ClientMerchant.prototype.exchangeRequest = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('exchangeRequest', reqData)];
            });
        });
    };
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
    ClientMerchant.prototype.exchangeHistory = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('exchangeHistory', reqData)];
            });
        });
    };
    /**
    * Retrieve payment information for a merchant using a track ID.
    *
    * @param {object} reqData - The request data for retrieving payment information.
    * @param {integer} reqData.trackId - The track ID associated with the payment (type: integer).
    * @returns {Promise<object>} - A promise that resolves with the payment information response data.
    * @throws {Error} - If there's an error during the API call.
    */
    ClientMerchant.prototype.paymentInfo = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('paymentInfo', reqData)];
            });
        });
    };
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
    ClientMerchant.prototype.paymentHistory = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('paymentHistory', reqData)];
            });
        });
    };
    /**
    * Retrieve the exchange rate between two currencies.
    *
    * @param {object} reqData - The request data for retrieving the exchange rate.
    * @param {string} reqData.fromCurrency - The source currency for the exchange rate (type: string).
    * @param {string} reqData.toCurrency - The target currency for the exchange rate (type: string).
    * @returns {Promise<object>} - A promise that resolves with the exchange rate response data.
    * @throws {Error} - If there's an error during the API call.
    */
    ClientMerchant.prototype.exchangeRate = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('exchangeRate', reqData)];
            });
        });
    };
    return ClientMerchant;
}());
exports.default = ClientMerchant;
