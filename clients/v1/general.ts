import axios from "axios";
import { readFile } from "fs/promises";
import { join } from "path";

/**
 * A class representing a client for interacting with the Oxapay General API.
 */
class ClientGeneral {
    private apiBaseURL = "https://api.oxapay.com/v1/general/";
    private methods: any;
    private initialization: Promise<void>;

    constructor() {
        this.initialization = readFile(join(__dirname, "methodInfos.json"), "utf-8")
            .then((data) => {
                this.methods = JSON.parse(data).Common;
            })
            .catch((err) => {
                throw new Error(`Failed to load method information: ${err.message}`);
            });
    }

    private async request<T>(method: keyof typeof this.methods, reqData?: object): Promise<T> {
        try {
            await this.initialization;
            const methodInfo = this.methods[method];
            if (!methodInfo) throw new Error(`Method ${String(method)} not found in methodInfos.json`);

            const url = `${this.apiBaseURL}${methodInfo.path}`;
            const response = await axios({
                method: methodInfo.reqType.toLowerCase(),
                url,
                data: reqData || {},
            });

            return response.data;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Request failed: ${err.message}`);
            } else {
                throw new Error("Request failed with an unknown error");
            }
        }
    }

    /**
     * Retrieve the list of blockchain networks supported by OxaPay.
     * @returns {Promise<object>} - A promise that resolves with the API response data.
     */
    async supportedNetworks(): Promise<{
        result: number;
        message: string;
        data: string[];
    }> {
        return this.request("supportedNetworks");
    }

    /**
     * Retrieve a comprehensive list of supported currencies and their network details.
     * @returns {Promise<object>} - A promise that resolves with the API response data.
     */
    async supportedCurrencies(): Promise<{
        result: number;
        message: string;
        data: {
            [key: string]: {
                symbol: string;
                name: string;
                status: boolean;
                networkList: {
                    [key: string]: {
                        minConfirm: number;
                        withdrawFee: number;
                        withdrawMin: number;
                        depositMin: number;
                        staticFixedFee: number;
                    };
                };
            };
        };
    }> {
        return this.request("supportedCurrencies");
    }

    /**
     * Retrieve a list of supported fiat currencies and their prices.
     * @returns {Promise<object>} - A promise that resolves with the API response data.
     */
    async supportedFiatCurrencies(): Promise<{
        result: number;
        message: string;
        data: {
            [key: string]: {
                symbol: string;
                name: string;
                price: number;
                displayPrecision: number;
            };
        };
    }> {
        return this.request("supportedFiatCurrencies");
    }

    /**
     * Retrieve the real-time exchange rate for a cryptocurrency pair.
     * @param {object} reqData - The request data.
     * @param {string} reqData.fromCurrency - The source currency.
     * @param {string} reqData.toCurrency - The target currency.
     * @returns {Promise<object>} - A promise that resolves with the exchange rate data.
     */
    async exchangeRate(reqData: {
        fromCurrency: string;
        toCurrency: string;
    }): Promise<{
        result: number;
        message: string;
        rate: number;
    }> {
        return this.request("exchangeRate", reqData);
    }

    /**
     * Calculate the amount of cryptocurrency you'll receive when exchanging.
     * @param {object} reqData - The request data.
     * @param {string} reqData.fromCurrency - The source currency.
     * @param {string} reqData.toCurrency - The target currency.
     * @param {number} reqData.amount - The amount to exchange.
     * @returns {Promise<object>} - A promise that resolves with the calculated exchange data.
     */
    async exchangeCalculate(reqData: {
        fromCurrency: string;
        toCurrency: string;
        amount: number;
    }): Promise<{
        result: number;
        message: string;
        rate: string;
        amount: string;
        toAmount: string;
    }> {
        return this.request("exchangeCalculate", reqData);
    }

    /**
     * Retrieve a list of exchangeable cryptocurrency pairs and their minimum conversion amounts.
     * @returns {Promise<object>} - A promise that resolves with the exchange pairs data.
     */
    async exchangePairs(): Promise<{
        result: number;
        message: string;
        data: {
            fromCurrency: string;
            toCurrency: string;
            minAmount: number;
        }[];
    }> {
        return this.request("exchangePairs");
    }

    /**
     * Retrieve the current prices of all cryptocurrencies supported by OxaPay.
     * @returns {Promise<object>} - A promise that resolves with the cryptocurrency prices.
     */
    async cryptoPrices(): Promise<{
        result: number;
        message: string;
        data: {
            [key: string]: number;
        };
    }> {
        return this.request("prices");
    }

    /**
     * Check the current state of the OxaPay API.
     * @returns {Promise<string>} - A promise that resolves with the API status.
     */
    async systemStatus(): Promise<string> {
        return this.request("systemStatus");
    }
}

export default ClientGeneral;