const axios = require("axios");

class Client {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiBaseURL = "https://api.oxapay.com/";
        this.methods = {
            createInvoice: "merchants/request",
            whiteLabel: "merchants/request/whitelabel",
            createStaticAddress: "merchants/request/staticaddress",
            revokeStaticAddress: "merchants/revoke/staticaddress",
            paymentInfo: "merchants/inquiry",
            paymentHistory: "merchants/list",
            allowedCoins: "merchants/allowedCoins",
            exchangeRate: "merchants/rate",
        };
    }

    async request(method, reqData) {
        try {
            const response = await axios.post(`${this.apiBaseURL}${method}`, {
                merchant: this.apiKey,
                ...reqData,
            });
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async allowedCoins() {
        return this.request(this.methods.allowedCoins);
    }

    async createInvoice(reqData) {
        return this.request(this.methods.createInvoice, reqData);
    }

    async whiteLabel(reqData) {
        return this.request(this.methods.whiteLabel, reqData);
    }

    async createStaticAddress(reqData) {
        return this.request(this.methods.createStaticAddress, reqData);
    }

    async revokeStaticAddress(reqData) {
        return this.request(this.methods.revokeStaticAddress, reqData);
    }

    async paymentInfo(reqData) {
        return this.request(this.methods.paymentInfo, reqData);
    }

    async paymentHistory(reqData) {
        return this.request(this.methods.paymentHistory, reqData);
    }

    async exchangeRate(reqData) {
        return this.request(this.methods.exchangeRate, reqData);
    }
}

module.exports = {
    Merchant: Client,
};