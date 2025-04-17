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
    private apiBaseURL = "https://api.oxapay.com/";
    private methods: Promise<any>;
    private apiKey: string;
    private isDebug: boolean;
    private initialization: Promise<any>;

    constructor(apiKey: string, debugLogger = false) {
        this.apiKey = apiKey;
        this.isDebug = debugLogger;
        if (!apiKey) throw new Error('API key is required');
        if (typeof debugLogger !== 'boolean') throw new Error('Debug logger must be a boolean');

        this.initialization = readFile(join(__dirname, 'methodInfos.json'), 'utf-8')
            .then(data => {
                this.methods = JSON.parse(data).Payout
            })
            .catch(err => {
                throw new Error(err.message)
            });
    }

    private async request(method: 'createPayout' | 'payoutHistory' | 'accountBalance' | 'payoutInquiry', reqData?: object) {
        try {
            await this.initialization;
            const response = await axios.post(`${this.apiBaseURL}${this.methods[method].path}`, {
                key: this.apiKey,
                ...reqData,
            });
            if (this.isDebug) console.log(response)
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    /**
    * Create a payout transaction.
    *
    * @param {object} reqData - The request data for creating a payout.
    * @param {string} reqData.address - The recipient's address for the payout (type: string).
    * @param {number} reqData.amount - The amount to be paid out (type: float).
    * @param {string} reqData.network - The network for the payout transaction (type: string).
    * @param {string} reqData.currency - The currency of the payout amount (type: string).
    * @param {string} reqData.callbackUrl - The URL for callback notifications (type: string).
    * @param {string} reqData.description - Description of the payout (type: string).
    * @returns {Promise<{object}>} - A promise that resolves with the payout transaction response data.
    * @throws {Error} - If there's an error during the API call/parameters.
    */

    async createPayout(reqData: {
        address: string;
        amount: number;
        network?: string;
        currency: string;
        callbackUrl?: string;
        description?: string;
    }): Promise<{
        result: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 135 | 500
        message: string,
        trackId: string,
        status: string
    }> {
        return this.request('createPayout', reqData);
    }

    /**
    * Retrieve payout transaction history with optional filtering and pagination.
    *
    * @param {object} reqData - The request data for retrieving payout transaction history.
    * @param {integer} reqData.fromDate - Start date for filtering payouts (type: integer).
    * @param {integer} reqData.toDate - End date for filtering payouts (type: integer).
    * @param {number} reqData.fromAmount - Minimum payout amount for filtering (type: float).
    * @param {number} reqData.toAmount - Maximum payout amount for filtering (type: float).
    * @param {string} reqData.currency - Currency for payout filtering (type: string).
    * @param {string} reqData.type - Payout type for filtering (type: string).
    * @param {string} reqData.network - Network name for filtering (type: string).
    * @param {string} reqData.status - Payout status for filtering (type: string).
    * @param {number} reqData.size - Number of results per page (type: integer).
    * @param {number} reqData.page - Page number for pagination (type: integer).
    * @param {string} reqData.sortBy - Field to sort by (type: string).
    * @param {string} reqData.orderBy - Sorting order (type: string).
    * @returns {Promise<object>} - A promise that resolves with the payout transaction history response data.
    * @throws {Error} - If there's an error during the API call.
    */

    async payoutHistory(reqData: {
        fromDate?: number;
        toDate?: number;
        fromAmount?: number;
        toAmount?: number;
        currency?: string;
        type?: string;
        network?: string;
        status?: string;
        size?: number;
        page?: number;
        sortBy?: string;
        orderBy?: string;
    }): Promise<{
        result: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 135 | 500
        message: string,
        data: [
            {
                id: string,
                address: string,
                currency: string,
                network: string,
                amount: string,
                fee: string,
                status: string,
                type: string,
                txID: string,
                date: string,
                description: string
            }
        ],
        meta: {
            size: number, // The number of payout transactions returned in the current page.
            page: number, // The current page number of the result set.
            pages: number, // The total number of pages available based on the number of records and page size.
            total: number // The total number of payout transactions available for the specified criteria.
        }
    }
    > {
        return this.request('payoutHistory', reqData);
    }

    /**
    * Retrieve the account balance for a specific currency.
    *
    * @param {object} reqData - The request data for retrieving the account balance.
    * @param {string} reqData.currency - The currency for which the balance is requested (type: string).
    * @returns {Promise<object>} - A promise that resolves with the account balance response data.
    * @throws {Error} - If there's an error during the API call.
    */

    async accountBalance(reqData: {
        currency?: string;
    }): Promise<{
        result: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 135 | 500
        message: string,
        data: {
            [key: string]: string // The currency code and balance amount.
        }
    }> {
        return this.request('accountBalance', reqData);
    }

    /**
    * Inquire about a payout using a specific currency and track ID.
    *
    * @param {object} reqData - The request data for payout inquiry.
    * @param {number} reqData.trackId - The track ID associated with the payout (type: number).
    * @returns {Promise<object>} - A promise that resolves with the payout inquiry response data.
    * @throws {Error} - If there's an error during the API call.
    */

    async payoutInquiry(reqData: {
        trackId: number;
    }): Promise<{
        result: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 135 | 500
        message: string,
        trackId: string,
        address: string,
        currency: string,
        network: string,
        amount: string,
        fee: string,
        status: string,
        type: string,
        txID: string,
        date: string,
        description: string
    }> {
        return this.request('payoutInquiry', reqData);
    }
}

export default ClientPayout;