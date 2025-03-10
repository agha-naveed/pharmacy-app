import express from 'express'
import Medicine from '../model/medicine.js'
import Supplier from '../model/supplier.js'

const router = express.Router();

router.route("/")
.post(async (req, res) => {
    const body = await req.body

    const name = body.name
    const stock = body.stock
    const batch = body.batch_no
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
        batch,
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

    let data, arr = [];

    const { q, page } = req.query

    console.log("page: "+page)
    let totalPrice = 0;
    
    await Medicine.deleteMany({stock: 0})


    const result = await Product.aggregate([
        { $match: { category: "electronics" } },
        { $sort: { createdAt: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
    ]);

    

    if(q) {
        data = await Medicine.find(
        { name: { $regex: q, $options: "i" } },
        ).sort({createdAt: -1}).lean()
    }
    else {
        data = await Medicine.find().sort({createdAt: -1}).lean()
    }

    for(let i=0; i<data.length; i++) {

        totalPrice+= await data[i].sell_pills_price * await data[i].pills_stock

        let obj = data[i]

        const names = await Supplier.findById(obj.supplier)
        
        obj['supplierName'] = await names?.name

        arr.push(obj)
    }

    return res.json({
        medicines: arr,
        message: 'ok',
        price: totalPrice
    })

})
.put(async(req, res) => {
    const body = await req.body
    const id = await body.rmId
    console.log(id)

    await Medicine.findByIdAndDelete(id).then(() => {
        return res.json({
            message: "ok"
        })
    }).catch(() => res.json({message: "error"}))
})

export default router