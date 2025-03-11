import express from 'express'
import Medicine from '../model/medicine.js'
import Supplier from '../model/supplier.js'
import MedicinePurchase from '../model/medicine-purchase.js';

const router = express.Router();

router.route("/")
.post(async (req, res) => {
    const body = await req.body

    const month = body.month
    const user = body.user
    const year = body.year
    const option = body.option

    if(option == "sell") {
        const data = await MedicinePurchase.find(
            {
                date: {
                    $gte: year + "-" + month,
                    $lt: year + "-" + (month + 1)
                }
            }
        )
    }
    if(option == "medicine") {
        const data = await Medicine.find(
            {
                date: {
                    $gte: year + "-" + month,
                    $lt: year + "-" + (month + 1)
                }
            }
        )
    }
})


export default router