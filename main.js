"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_1 = __importDefault(require("./clients/legacy/general"));
const merchant_1 = __importDefault(require("./clients/legacy/merchant"));
const payout_1 = __importDefault(require("./clients/legacy/payout"));
const payment_1 = __importDefault(require("./clients/v1/payment"));
const general_2 = __importDefault(require("./clients/v1/general"));
const payout_2 = __importDefault(require("./clients/v1/payout"));
exports.default = {
    legacy: {
        general: general_1.default,
        merchant: merchant_1.default,
        payout: payout_1.default,
    },
    v1: {
        payment: payment_1.default,
        general: general_2.default,
        payout: payout_2.default,
    },
};
