"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var general_1 = require("./clients/legacy/general");
var merchant_1 = require("./clients/legacy/merchant");
var payout_1 = require("./clients/legacy/payout");
var payment_1 = require("./clients/v1/payment");
var general_2 = require("./clients/v1/general");
var payout_2 = require("./clients/v1/payout");
var common_1 = require("./clients/v1/common");
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
        common: common_1.default,
    },
};
