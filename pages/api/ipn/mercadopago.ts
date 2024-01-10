import type { NextApiRequest, NextApiResponse } from "next"
import { getMerchantOrderId } from "lib/mercadopago"
import { Order } from "lib/models/order"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query
    if (topic === "merchant_order") {
        const order = await getMerchantOrderId({ merchantOrderId: id as string | number })
        const { order_status, external_reference } = order
        const orderStatus = order_status
        const orderId = external_reference
        // console.log(orderStatus)
        if (orderStatus === "paid") {
            const myOrder = new Order(orderId)
            await myOrder.pull()
            // console.log(myOrder.data.status)
            myOrder.data.status = "closed"
            await myOrder.push()
            //send email tu pago fue confirmado
            //sendemail interno, alguien compro algo
            console.log("todo bien?")
            res.send({ message: "ok" })
        }
    } else {
        console.error("hubo un error")
    }
}
