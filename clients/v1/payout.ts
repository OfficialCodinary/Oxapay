import axios from "axios";
import { readFile } from "fs/promises";
import { join } from 'path';

/**
 * Create a new client for interacting with the Oxapay Merchant API.
 * @param {string} apiKey - The API key for the Oxapay Merchant API.
 * @param {boolean} debugLogger - A flag to enable/disable debug logging.
 * @example
 * const client = new ClientPayout('your-api-key', true);
 * // or
 * const client = new ClientPayout('your-api-key');
 */
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

    private async request(method: keyof typeof this.methods, reqData?: object, explicitUrl?: string) {
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
                data: {
                    ...reqData,
                },
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

    /**
     * Create a payout transaction.
     *
     * @param {object} reqData - The request data for creating a payout.
     * @returns {Promise<object>} - A promise that resolves with the payout transaction response data.
     */
    async createPayout(reqData: {
        address: string;
        currency: string;
        amount: number;
        network?: string;
        callback_url?: string;
        memo?: string;
        description?: string;
    }): Promise<{
        data: {
            track_id: string, 
            status: string // The status of payout transaction.
        },
        message: string, 
        error?: {
            type: string, 
            key: string, 
            message: string 
        },
        status: number, 
        version: string
    }> {
        return this.request('generatePayout', reqData);
    }

    /**
     * Retrieve payout transaction history with optional filtering and pagination.
     *
     * @param {object} reqData - The request data for retrieving payout transaction history.
     * @returns {Promise<object>} - A promise that resolves with the payout transaction history response data.
     */
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
    }): Promise<{
        data: {
          list: 
              {
                track_id: string,
                address: string, 
                currency: string, 
                network: string, 
                amount: number, 
                fee: number, 
                status: string,
                tx_hash: string,
                description: string, 
                internal: boolean, 
                memo: string,
                date: number 
            }[],
          meta: {
            page: number, 
            last_page: number,
            total: number
          },
        },
        message: string,  
        error: {
            type: string, 
            key: string, 
            message: string 
        } | {},
        status: number,
        version: string
      }> {
        return this.request('payoutHistory', reqData);
    }

    /**
     * Inquire about a payout using a specific track ID.
     *
     * @param {object} reqData - The request data for payout inquiry.
     * @returns {Promise<object>} - A promise that resolves with the payout inquiry response data.
     */
    async payoutInfo(reqData: {
        trackId: string;
    }): Promise<{
        data: {
            track_id: string,
            address: string, 
            currency: string,
            network: string,
            amount: number, 
            fee: number, 
            status: string, 
            tx_hash: string, 
            description: string,
            internal: boolean, 
            memo: string,
            date: number
        },
        message: string,
        error: object,
        status: number,
        version: string
    }> {
        const methodInfo = this.methods['payoutInfo'];
        const url = `${this.apiBaseURL}${methodInfo.path}/${reqData.trackId}`;
        return this.request('payoutInfo', reqData, url);
    }
}

export default ClientPayout;