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
 * A class representing a client for interacting with the Oxapay General API.
 */
class ClientGeneral {
    private apiBaseURL = "https://api.oxapay.com/v1/general";
    private methods: any;
    private initialization: Promise<void>;

    constructor() {
        this.initialization = readFile(join(__dirname, "methodInfos.json"), "utf-8")
            .then((data) => {
                this.methods = JSON.parse(data).General;
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

    async swapRequest(reqData: {
        from_Currency: string;
        to_Currency: string;
        amount: number;
    }): Promise<ResponseType<{
        track_id: string;
        from_currency: string;
        to_currency: string;
        from_amount: number;
        to_amount: number;
        rate: number;
        date: number;
    }>> {
        return this.request("swapRequest", reqData);
    }

    async swapHistory(reqData?: {
        track_id?: string;
        type?: string;
        status?: string;
        from_currency?: string;
        to_currency?: string;
        from_date?: number;
        to_date?: number;
        sort_by?: 'create_date' | 'amount'
        sort_type?: 'asc' | 'desc'
        size?: number;
        page?: number;
    }): Promise<ResponseType<{
        list: {
            track_id: string;
            from_currency: string;
            to_currency: string;
            from_amount: number;
            to_amount: number;
            rate: number;
            date: number;
        }[];
        meta: {
            page: number;
            last_page: number;
            total: number;
        };
    }>> {
        return this.request("swapHistory", reqData);
    }

    async swapPairs(): Promise<ResponseType<{
        list: {
            from_currency: string;
            to_currency: string;
            min_amount: number;
        }[];
        meta: {
            page: number;
            last_page: number;
            total: number;
        };
    }[]>> {
        return this.request("swapPairs");
    }

    async swapCalculate(reqData: {
        from_currency: string;
        to_currency: string;
        amount: number;
    }): Promise<ResponseType<{
        to_amount: number;
        rate: number;
        amount: number;
    }>> {
        return this.request("swapCalculate", reqData);
    }

    async swapRate(reqData: {
        from_currency: string;
        to_currency: string;
    }): Promise<ResponseType<{
        rate: number;
    }>> {
        return this.request("swapRate", reqData);
    }

    async accountBalance(): Promise<ResponseType<{
        [currency: string]: {
            available: number;
            pending: number;
        };
    }>> {
        return this.request("accountBalance");
    }
}

export default ClientGeneral;