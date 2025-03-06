import express from 'express'
import Medicine from '../model/medicine.js'
import Supplier from '../model/supplier.js'

const router = express.Router();

router.route("/")
.post(async (req, res) => {
    const body = await req.body

    const name = body.name
    const stock = body.stock
    const batch_no = body.batch_no
    const pay_method = body.pay_method
    const supplier = body.supplier
    const packet_price = body.packet_price
    const discount = body.discount
    const pills_packet = body.pills_packet
    const pills_price = body.pills_price
    const date = body.date
    const sell_pills_price = body.sell_pills_price
    const expiry_date = body.expiry_date

    await Medicine.insertOne({
        name,
        stock,
        batch_no,
        pay_method,
        supplier,
        packet_price,
        discount,
        pills_packet,
        pills_price,
        date,
        sell_pills_price,
        expiry_date
    }).then(() => res.json({ message: 'ok' }))
    .catch(() => res.json({ message: "some error occurred!" }))

})
.get(async (req, res) => {
    try {
        const data = await Supplier.find()

        if(q) {
            return res.json({
                suppliers: data,
                message: 'get'
            })
        }
        else {
            
        }
    }
    catch(err) {
        console.log("try catch: "+err)
    }

})
.patch(async (req, res) => {
    const { q } = req.query
    console.log(q)

    const medicine = await Medicine.find()

    return res.json({
        medicine,
        suppliers: data,
        message: 'patch'
    })

})


export default router