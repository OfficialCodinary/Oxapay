"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payout = exports.Merchant = exports.General = void 0;
var general_1 = require("./clients/general");
exports.General = general_1.default;
var merchant_1 = require("./clients/merchant");
exports.Merchant = merchant_1.default;
var payout_1 = require("./clients/payout");
exports.Payout = payout_1.default;
