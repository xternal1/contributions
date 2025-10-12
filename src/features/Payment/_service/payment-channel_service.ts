import api from "../../../services/api";
import type { PaymentChannelResponse } from "../../Payment/payment-channel";


export const getPaymentChannels = async (): Promise<PaymentChannelResponse> => {
    try {
        const response = await api.get<PaymentChannelResponse>(
            "/api/payment-channels"
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching payment channels:", error);
        throw error;
    }
};
