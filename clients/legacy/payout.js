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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
 * Create a new client for interacting with the Oxapay Merchant API.
 * @param {string} apiKey - The API key for the Oxapay Merchant API.
 * @param {boolean} debugLogger - A flag to enable/disable debug logging.
 * @example
 * const client = new ClientPayout('your-api-key', true);
 * // or
 * const client = new ClientPayout('your-api-key');
*/
var ClientPayout = /** @class */ (function () {
    function ClientPayout(apiKey, debugLogger) {
        if (debugLogger === void 0) { debugLogger = false; }
        var _this = this;
        this.apiBaseURL = "https://api.oxapay.com/";
        this.apiKey = apiKey;
        this.isDebug = debugLogger;
        if (!apiKey)
            throw new Error('API key is required');
        if (typeof debugLogger !== 'boolean')
            throw new Error('Debug logger must be a boolean');
        this.initialization = (0, promises_1.readFile)((0, path_1.join)(__dirname, 'methodInfos.json'), 'utf-8')
            .then(function (data) {
            _this.methods = JSON.parse(data).Payout;
        })
            .catch(function (err) {
            throw new Error(err.message);
        });
    }
    ClientPayout.prototype.request = function (method, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.initialization];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, axios_1.default.post("".concat(this.apiBaseURL).concat(this.methods[method].path), __assign({ key: this.apiKey }, reqData))];
                    case 2:
                        response = _a.sent();
                        if (this.isDebug)
                            console.log(response);
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
    ClientPayout.prototype.createPayout = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('createPayout', reqData)];
            });
        });
    };
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
    ClientPayout.prototype.payoutHistory = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('payoutHistory', reqData)];
            });
        });
    };
    /**
    * Retrieve the account balance for a specific currency.
    *
    * @param {object} reqData - The request data for retrieving the account balance.
    * @param {string} reqData.currency - The currency for which the balance is requested (type: string).
    * @returns {Promise<object>} - A promise that resolves with the account balance response data.
    * @throws {Error} - If there's an error during the API call.
    */
    ClientPayout.prototype.accountBalance = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('accountBalance', reqData)];
            });
        });
    };
    /**
    * Inquire about a payout using a specific currency and track ID.
    *
    * @param {object} reqData - The request data for payout inquiry.
    * @param {number} reqData.trackId - The track ID associated with the payout (type: number).
    * @returns {Promise<object>} - A promise that resolves with the payout inquiry response data.
    * @throws {Error} - If there's an error during the API call.
    */
    ClientPayout.prototype.payoutInquiry = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('payoutInquiry', reqData)];
            });
        });
    };
    return ClientPayout;
}());
exports.default = ClientPayout;
