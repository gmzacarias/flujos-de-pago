import type { NextApiRequest, NextApiResponse } from "next"
import { getMerchantOrderId } from "lib/mercadopago"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query
    if (topic !== "merchant_order") {
        res.send({ message: "no hay id" })
        return
    }
    const response = await getMerchantOrderId({ merchantOrderId: id as string | number })
    console.log(response)
    res.json(response)
}
