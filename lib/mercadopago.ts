import { MercadoPagoConfig, MerchantOrder } from 'mercadopago';
import type { MerchantOrderGetData } from 'mercadopago/dist/clients/merchantOrder/get/types';
const accessToken = process.env.ACCESS_TOKEN

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({ accessToken: accessToken, options: { timeout: 5000, idempotencyKey: 'abc' } });
const merchantOrder = new MerchantOrder(client)


export async function getMerchantOrderId(orderData:MerchantOrderGetData) {
    const orderId = await merchantOrder.get(orderData)
    
    return orderId
}