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
    const partial_price = body.partial_price

    const update = body.update

    const pills_stock = body.pills_packet * stock


    if(!update) {
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
            pills_stock,
            date,
            sell_pills_price,
            expiry_date,
            partial_price: partial_price ?? 0
        }).then(() => res.json({ message: 'ok' }))
        .catch((err) => {
            res.json({ message: "some error occurred!" })
            console.log(err)
        })
    }

    else {
        await Medicine.updateOne(
            {
                batch_no
            },
            {
                $set: {
                    name,
                    stock,
                    batch_no,
                    pay_method,
                    supplier,
                    packet_price,
                    discount,
                    pills_packet,
                    pills_price,
                    pills_stock,
                    date,
                    sell_pills_price,
                    expiry_date,
                    partial_price: partial_price ?? 0
                }
        }).then(() => res.json({ message: 'ok' }))
        .catch((err) => {
            res.json({ message: "some error occurred!" })
            console.log(err)
        })
    }

    

})
.get(async (req, res) => {
    console.log("GETm ehtid")
    const data = await Supplier.find()

    return res.json({
        suppliers: data,
        message: 'ok'
    })
})
.patch(async (req, res) => {
    let { q } = req.query
    
    const medicine = await Medicine.findById(q)

    const data = await Supplier.findById(medicine.supplier)


    return res.json({
        medicine,
        suppliers: data,
        message: 'ok'
    })
})

export default router