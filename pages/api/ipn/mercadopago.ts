import type { NextApiRequest, NextApiResponse } from "next"
import { getMerchantOrderId } from "lib/mercadopago"
import { Order } from "lib/models/order"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query
    if (topic === "merchant_order") {
        const order = await getMerchantOrderId({ merchantOrderId: id as string | number })
        // res.send(order)
        console.log(order.order_status)
        if (order.order_status === "paid") {
            const orderId = order.external_reference
            const myOrder = new Order(orderId)
            myOrder.pull()
            myOrder.data.status = "closed"
            await myOrder.push()
            //send email tu pago fue confirmado
            //sendemail interno, alguien compro algo
            res.send("ok")
        }
    } else {
        console.error("hubo un error")
    }
}
