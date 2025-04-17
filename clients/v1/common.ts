import axios from "axios";
import { readFile } from "fs/promises";
import { join } from "path";

/**
 * A generic type for API responses.
 * @template T - The type of the response data.
 */
type ResponseType<T> = {
    data: T;
    message: string;
    error: {
        type: string;
        key: string;
        message: string;
    };
    status: number;
    version: string;
};

/**
 * A class representing a client for interacting with the Oxapay Common API.
 */
class ClientCommon {
    private apiBaseURL = "https://api.oxapay.com/v1/common/";
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

    private async request<T>(method: keyof typeof this.methods, reqData?: object): Promise<ResponseType<T>> {
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

    async prices(): Promise<ResponseType<{
        [currency: string]: number;
    }>> {
        return this.request("prices");
    }

    async supportedCurrencies(): Promise<ResponseType<{
        [key: string]: {
            symbol: string;
            name: string;
            status: boolean;
            networks: {
                [networkName: string]: {
                    network: string,
                    name: string,
                    required_confirmations: number,
                    withdraw_fee: number,
                    withdraw_min: number,
                    deposit_min: number,
                    static_fixed_fee: number,
                };
            };
        };
    }>> {
        return this.request("supportedCurrencies");
    }

    async supportedFiatCurrencies(): Promise<ResponseType<{
        [key: string]: {
            symbol: string;
            name: string;
            price: number;
            display_precision: number;
        };
    }>> {
        return this.request("supportedFiatCurrencies");
    }

    async supportedNetworks(): Promise<ResponseType<{
        list: string[]
    }>> {
        return this.request("supportedNetworks");
    }

    async systemStatus(): Promise<ResponseType<{
        status: boolean
    }>> {
        return this.request("systemStatus");
    }
}

export default ClientCommon;