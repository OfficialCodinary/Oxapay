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
 * A class representing a client for interacting with the Oxapay Payment API.
 * @param {string} apiKey - The API key for authentication.
 * @param {boolean} debugLogger - A flag to enable/disable debug logging.
 * @example
 * const client = new ClientPayment('your-api-key', true);
 * // or
 * const client = new ClientPayment('your-api-key');
 */
class ClientPayment {
    constructor(apiKey, debugLogger = false) {
        this.apiBaseURL = "https://api.oxapay.com/v1/payment";
        this.apiKey = apiKey;
        this.isDebug = debugLogger;
        if (!apiKey)
            throw new Error("API key is required");
        if (typeof debugLogger !== "boolean")
            throw new Error("Debug logger must be a boolean");
        this.initialization = (0, promises_1.readFile)((0, path_1.join)(__dirname, "methodInfos.json"), "utf-8")
            .then((data) => {
            this.methods = JSON.parse(data).Payment;
        })
            .catch((err) => {
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
                    data: reqData,
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
    generateInvoice(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("generateInvoice", reqData);
        });
    }
    generateWhiteLabel(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("generateWhiteLabel", reqData);
        });
    }
    generateStaticAddress(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("generateStaticAddress", reqData);
        });
    }
    revokeStaticAddress(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("revokeStaticAddress", reqData);
        });
    }
    listStaticAddress(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("listStaticAddress", reqData);
        });
    }
    /**
     * Retrieve the payment information for a specific transaction.
     * @param {object} reqData - The request data containing the track ID.
     * @param {string} reqData.track_id - The track ID of the transaction.
     * @returns {Promise<object>} - A promise that resolves with the payment information.
     * @example
     * const paymentInfo = await client.paymentInfo({ trackId: 'your-track-id' });
     * console.log(paymentInfo);
     */
    paymentInfo(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodInfo = this.methods["paymentInfo"];
            const url = `${this.apiBaseURL}${methodInfo.path}/${reqData.track_id}`;
            return this.request("paymentInfo", {}, url);
        });
    }
    /**
     *
     * @param reqData - The request data for payment history.
     * @param reqData.track_id - The track ID of the payment.
     * @returns
     */
    paymentHistory(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("paymentHistory", reqData);
        });
    }
    acceptedCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("acceptedCurrencies");
        });
    }
}
exports.default = ClientPayment;
