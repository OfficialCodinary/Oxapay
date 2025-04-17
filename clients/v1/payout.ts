import axios from "axios";
import { readFile } from "fs/promises";
import { join } from 'path';

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
    } | {};
    status: number;
    version: string;
};

class ClientPayout {
    private apiBaseURL = "https://api.oxapay.com/v1/payout";
    private methods: any;
    private apiKey: string;
    private isDebug: boolean;
    private initialization: Promise<void>;

    constructor(apiKey: string, debugLogger = false) {
        this.apiKey = apiKey;
        this.isDebug = debugLogger;
        if (!apiKey) throw new Error('API key is required');
        if (typeof debugLogger !== 'boolean') throw new Error('Debug logger must be a boolean');

        this.initialization = readFile(join(__dirname, 'methodInfos.json'), 'utf-8')
            .then(data => {
                this.methods = JSON.parse(data).Payout;
            })
            .catch(err => {
                throw new Error(`Failed to load method information: ${err.message}`);
            });
    }

    private async request<T>(method: keyof typeof this.methods, reqData?: object, explicitUrl?: string): Promise<ResponseType<T>> {
        try {
            await this.initialization;
            const methodInfo = this.methods[method];
            if (!methodInfo) throw new Error(`Method ${String(method)} not found in methodInfos.json`);

            const url = explicitUrl ?? `${this.apiBaseURL}${methodInfo.path}`;
            const response = await axios({
                method: methodInfo.reqType.toLowerCase(),
                url,
                headers: {
                    "merchant_api_key": this.apiKey,
                },
                data: reqData,
            });

            if (this.isDebug) console.log(response.data);
            return response.data;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Request failed: ${err.message}`);
            } else {
                throw new Error("Request failed with an unknown error");
            }
        }
    }

    async createPayout(reqData: {
        address: string;
        currency: string;
        amount: number;
        network?: string;
        callback_url?: string;
        memo?: string;
        description?: string;
    }): Promise<ResponseType<{
        track_id: string;
        status: string;
    }>> {
        return this.request('generatePayout', reqData);
    }

    async payoutHistory(reqData: {
        status?: string;
        type?: string;
        currency?: string;
        network?: string;
        from_amount?: number;
        to_amount?: number;
        from_date?: number;
        to_date?: number;
        sort_by?: string;
        sort_type?: 'asc' | 'desc';
        size?: number;
        page?: number;
    }): Promise<ResponseType<{
        list: {
            track_id: string;
            address: string;
            currency: string;
            network: string;
            amount: number;
            fee: number;
            status: string;
            tx_hash: string;
            description: string;
            internal: boolean;
            memo: string;
            date: number;
        }[];
        meta: {
            page: number;
            last_page: number;
            total: number;
        };
    }>> {
        return this.request('payoutHistory', reqData);
    }

    async payoutInfo(reqData: {
        trackId: string;
    }): Promise<ResponseType<{
        track_id: string;
        address: string;
        currency: string;
        network: string;
        amount: number;
        fee: number;
        status: string;
        tx_hash: string;
        description: string;
        internal: boolean;
        memo: string;
        date: number;
    }>> {
        const methodInfo = this.methods['payoutInfo'];
        const url = `${this.apiBaseURL}${methodInfo.path}/${reqData.trackId}`;
        return this.request('payoutInfo', reqData, url);
    }
}

export default ClientPayout;