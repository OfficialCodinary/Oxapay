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
    } | {};
    status: number;
    version: string;
};

/**
 * A class representing a client for interacting with the Oxapay Payment API.
 * @param {string} apiKey - The API key for authentication.
 * @param {boolean} debugLogger - A flag to enable/disable debug logging.
 * @example
 * const client = new ClientPayment('your-api-key', true);
 * // or
 * const client = new ClientPayment('your-api-key');
 */
class ClientPayment {
    private apiBaseURL = "https://api.oxapay.com/v1/payment";
    private methods: any;
    private apiKey: string;
    private isDebug: boolean;
    private initialization: Promise<void>;

    constructor(apiKey: string, debugLogger = false) {
        this.apiKey = apiKey;
        this.isDebug = debugLogger;
        if (!apiKey) throw new Error("API key is required");
        if (typeof debugLogger !== "boolean") throw new Error("Debug logger must be a boolean");

        this.initialization = readFile(join(__dirname, "methodInfos.json"), "utf-8")
            .then((data) => {
                this.methods = JSON.parse(data).Payment;
            })
            .catch((err) => {
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

    async generateInvoice(reqData: {
        amount: number;
        currency: string;
        lifetime?: number;
        fee_paid_by_payer?: 0 | 1;
        under_paid_coverage?: number;
        to_currency?: string;
        auto_withdrawal?: 0 | 1;
        mixed_payment?: 0 | 1;
        callback_url?: string;
        return_url?: string;
        email?: string;
        order_id?: string;
        thanks_message?: string;
        description?: string;
        sandbox?: boolean;
    }): Promise<ResponseType<{
        track_id: string;
        payment_url: string;
        expired_at: number;
        date: number;
    }>> {
        return this.request("generateInvoice", reqData);
    }

    async generateWhiteLabel(reqData: {
        pay_currency: string;
        amount: number;
        currency?: string;
        network?: string;
        lifetime?: number;
        fee_paid_by_payer?: 0 | 1;
        under_paid_cover?: number;
        to_currency?: string;
        auto_withdrawal?: 0 | 1;
        callback_url?: string;
        email?: string;
        orderId?: string;
        description?: string;
    }): Promise<ResponseType<{
        track_id: string;
        amount: number;
        currency: string;
        pay_amount: number;
        pay_currency: string;
        network: string;
        address: string;
        callback_url: string;
        description: string;
        email: string;
        fee_paid_by_payer: number;
        lifetime: number;
        order_id: string;
        under_paid_coverage: number;
        rate: number;
        qr_code: string;
        expired_at: number;
        date: number;
    }>> {
        return this.request("generateWhiteLabel", reqData);
    }

    async generateStaticAddress(reqData: {
        network: string;
        to_currency?: string;
        auto_withdrawal?: 0 | 1;
        callback_url?: string;
        email?: string;
        order_id?: string;
        description?: string;
    }): Promise<ResponseType<{
        track_id: string;
        network: string;
        address: string;
        qr_code: string;
        date: number;
    }>> {
        return this.request("generateStaticAddress", reqData);
    }

    async revokeStaticAddress(reqData: {
        address: string;
    }): Promise<ResponseType<{}>> {
        return this.request("revokeStaticAddress", reqData);
    }

    async listStaticAddress(reqData: {
        track_id?: string;
        network?: string;
        currency?: string;
        address?: string;
        have_tx?: string;
        order_id?: string;
        email?: string;
        page?: number;
        size?: number;
    }): Promise<ResponseType<{
        list: {
            track_id: string;
            address: string;
            network: string;
            callback_url: string;
            email: string;
            order_id: string;
            description: string;
            date: number;
        }[];
        meta: {
            page: number;
            last_page: number;
            total: number;
        };
    }>> {
        return this.request("listStaticAddress", reqData);
    }

    /**
     * Retrieve the payment information for a specific transaction.
     * @param {object} reqData - The request data containing the track ID.
     * @param {string} reqData.track_id - The track ID of the transaction.
     * @returns {Promise<object>} - A promise that resolves with the payment information.
     * @example
     * const paymentInfo = await client.paymentInfo({ trackId: 'your-track-id' });
     * console.log(paymentInfo);
     */

    async paymentInfo(reqData: {
        track_id: string;
    }): Promise<ResponseType<{
        track_id: string;
        type: string;
        amount: number;
        currency: string;
        status: string;
        mixed_payment: boolean;
        callback_url: string;
        description: string;
        email: string;
        fee_paid_by_payer: number;
        lifetime: number;
        order_id: string;
        under_paid_coverage: number;
        return_url: string;
        thanks_message: string;
        expired_at: number;
        date: number;
        txs: {
            tx_hash: string;
            amount: number;
            currency: string;
            network: string;
            address: string;
            status: string;
            confirmations: number;
            auto_convert: {
                processed: boolean;
                amount: number;
                currency: string;
            };
            auto_withdrawal: {
                processed: boolean;
            };
            date: number;
        }[];
    }>> {
        const methodInfo = this.methods["paymentInfo"];
        const url = `${this.apiBaseURL}${methodInfo.path}/${reqData.track_id}`;
        return this.request("paymentInfo", {}, url);
    }

    /**
     * 
     * @param reqData - The request data for payment history.
     * @param reqData.track_id - The track ID of the payment.
     * @returns 
     */

    async paymentHistory(reqData: {
        track_id?: string;
        type?: string;
        status?: string;
        pay_currency?: string;
        currency?: string;
        network?: string;
        address?: string;
        from_date?: number;
        to_date?: number;
        from_amount?: number;
        to_amount?: number;
        sort_by?: "create_date" | "pay_date" | "amount";
        sort_type?: "asc" | "desc";
        page?: number;
        size?: number;
    }): Promise<ResponseType<{
        list: {
            track_id: string;
            type: string;
            amount: number;
            currency: string;
            status: string;
            mixed_payment: boolean;
            callback_url: string;
            description: string;
            email: string;
            fee_paid_by_payer: number;
            lifetime: number;
            order_id: string;
            under_paid_coverage: number;
            return_url: string;
            thanks_message: string;
            expired_at: number;
            date: number;
            txs: {
                tx_hash: string;
                amount: number;
                currency: string;
                network: string;
                address: string;
                status: string;
                confirmations: number;
                auto_convert: {
                    processed: boolean;
                    amount: number;
                    currency: string;
                };
                auto_withdrawal: {
                    processed: boolean;
                };
                date: number;
            }[];
        }[];
        meta: {
            page: number;
            last_page: number;
            total: number;
        };
    }>> {
        return this.request("paymentHistory", reqData);
    }

    async acceptedCurrencies(): Promise<ResponseType<{
        list: string[];
    }>> {
        return this.request("acceptedCurrencies");
    }
}

export default ClientPayment;