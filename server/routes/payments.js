import express from 'express'
import Medicine from '../model/medicine.js'
import Supplier from '../model/supplier.js'
import MedicinePurchase from '../model/medicine-purchase.js';
import User from '../model/user.js';

const router = express.Router();

router.route("/")
.get(async (req, res) => {
    
    const user = await Medicine.find({
        pay_method: {
            $in: ["partial", "credit"]
        }
    }).lean()

    let arr = []

    for(let i=0; i<user.length; i++) {
        let obj = user[i]

        let n = await Supplier.findById(user[i].supplier)
        obj['supplier_name'] = n.name

        arr.push(obj)
    }

    if(user) {
        return res.json({
            message: "ok",
            pay: arr
        })
    }
})
.patch(async (req, res) => {
    const body = await req.body
    const id = body.id
    console.log(id)
    
    await Medicine.updateOne({
            batch_no: id
        }, {
        pay_method: "cash"
    })
    .then(() => {
        return res.json({message: 'ok'})
    }).catch(() => res.json({message: "error"}))
})
.put(async (req, res) => {
    const { q } = req.query

    try {
        const data = await Medicine.find(
            { 
                pay_method: {
                    $in: ["partial", "credit"]
                },
                name: {
                    $regex: q,
                    $options: "i"
                }
            },
        ).sort({createdAt: -1}).lean()

        console.log(data)

        const arr = []

        for(let i=0; i<data.length; i++) {
            let obj = data[i]
            const supplier_name = await Supplier.findById(obj.supplier)
            obj["supplier_name"] = supplier_name.name
            arr.push(obj)
        }

        if(data) {
            return res.json({
                message: 'ok',
                data: arr
            })
        }
        else {
            return res.json({
                message: 'no data'
            })
        }
    } catch(err) {
        return res.json({
            message: "error"
        })
    }
})


export default router