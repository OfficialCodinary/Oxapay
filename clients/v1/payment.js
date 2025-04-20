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
 * A class representing a client for interacting with the Oxapay Payment API.
 * @param {string} apiKey - The API key for authentication.
 * @param {boolean} debugLogger - A flag to enable/disable debug logging.
 * @example
 * const client = new ClientPayment('your-api-key', true);
 * // or
 * const client = new ClientPayment('your-api-key');
 */
var ClientPayment = /** @class */ (function () {
    function ClientPayment(apiKey, debugLogger) {
        if (debugLogger === void 0) { debugLogger = false; }
        var _this = this;
        this.apiBaseURL = "https://api.oxapay.com/v1/payment/";
        this.apiKey = apiKey;
        this.isDebug = debugLogger;
        if (!apiKey)
            throw new Error("API key is required");
        if (typeof debugLogger !== "boolean")
            throw new Error("Debug logger must be a boolean");
        this.initialization = (0, promises_1.readFile)((0, path_1.join)(__dirname, "methodInfos.json"), "utf-8")
            .then(function (data) {
            _this.methods = JSON.parse(data).Payment;
        })
            .catch(function (err) {
            throw new Error("Failed to load method information: ".concat(err.message));
        });
    }
    ClientPayment.prototype.request = function (method, reqData, explicitUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var methodInfo, url, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.initialization];
                    case 1:
                        _a.sent();
                        methodInfo = this.methods[method];
                        if (!methodInfo)
                            throw new Error("Method ".concat(String(method), " not found in methodInfos.json"));
                        url = explicitUrl !== null && explicitUrl !== void 0 ? explicitUrl : "".concat(this.apiBaseURL).concat(methodInfo.path);
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: methodInfo.reqType.toLowerCase(),
                                url: url,
                                headers: {
                                    "merchant_api_key": this.apiKey,
                                },
                                data: reqData,
                                validateStatus: function () { return true; },
                            })];
                    case 2:
                        response = _a.sent();
                        if (this.isDebug)
                            console.log(response.data);
                        return [2 /*return*/, response.data];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1 instanceof Error) {
                            throw new Error("Request failed: ".concat(err_1.message));
                        }
                        else {
                            throw new Error("Request failed with an unknown error");
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ClientPayment.prototype.generateInvoice = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("generateInvoice", reqData)];
            });
        });
    };
    ClientPayment.prototype.generateWhiteLabel = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("generateWhiteLabel", reqData)];
            });
        });
    };
    ClientPayment.prototype.generateStaticAddress = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("generateStaticAddress", reqData)];
            });
        });
    };
    ClientPayment.prototype.revokeStaticAddress = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("revokeStaticAddress", reqData)];
            });
        });
    };
    ClientPayment.prototype.listStaticAddress = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("listStaticAddress", reqData)];
            });
        });
    };
    /**
     * Retrieve the payment information for a specific transaction.
     * @param {object} reqData - The request data containing the track ID.
     * @param {string} reqData.track_id - The track ID of the transaction.
     * @returns {Promise<object>} - A promise that resolves with the payment information.
     * @example
     * const paymentInfo = await client.paymentInfo({ trackId: 'your-track-id' });
     * console.log(paymentInfo);
     */
    ClientPayment.prototype.paymentInfo = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var methodInfo, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialization];
                    case 1:
                        _a.sent();
                        methodInfo = this.methods["paymentInfo"];
                        url = "".concat(this.apiBaseURL).concat(methodInfo.path).concat(reqData.track_id);
                        return [2 /*return*/, this.request("paymentInfo", {}, url)];
                }
            });
        });
    };
    /**
     *
     * @param reqData - The request data for payment history.
     * @param reqData.track_id - The track ID of the payment.
     * @returns
     */
    ClientPayment.prototype.paymentHistory = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("paymentHistory", reqData)];
            });
        });
    };
    ClientPayment.prototype.acceptedCurrencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("acceptedCurrencies")];
            });
        });
    };
    return ClientPayment;
}());
exports.default = ClientPayment;
