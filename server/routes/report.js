import express from 'express'
import Medicine from '../model/medicine.js'
import Supplier from '../model/supplier.js'
import MedicinePurchase from '../model/medicine-purchase.js';
import User from '../model/user.js';

const router = express.Router();

router.route("/")
.get(async (req, res) => {
    const user = await User.find()

    if(user) {
        return res.json({
            message: "ok",
            user
        })
    }
})
.post(async (req, res) => {
    const body = await req.body

    const month = body.month
    const user = body.user
    const year = body.year
    const option = body.option


    if(option == "sell") {
        if(user) {
            if(user != 'admin') {
                const data = await MedicinePurchase.find(
                    {
                        date: {
                            $gte: year + "-" + month,
                            $lt: year + "-" + (month + 1)
                        },
                        user
                    }
                )
                if(data) {
                    return res.json({
                        message: "ok",
                        data
                    })
                }
                else {
                    return res.json({message: "no data"})
                }
            }
            else {
                const data = await MedicinePurchase.find(
                    {
                        date: {
                            $gte: year + "-" + month + "-" + "01",
                            $lt: year + "-" + (month + 1) + "-" + "01"
                        }
                    }
                )
                if(data) {
                    return res.json({
                        message: "ok",
                        data
                    })
                }
                else {
                    return res.json({message: "no data"})
                }
            }
        }
    }
    if(option == "medicine") {
        if(month != '*') {
            const data = await Medicine.find(
                {
                    date: {
                        $gte: year + "-" + month + "-" + "01",
                        $lt: year + "-" + (month + 1) + "-" + "01"
                    },
                }
            )
            if(data) {
                return res.json({
                    message: "ok",
                    data
                })
            }
            else {
                return res.json({message: "no data"})
            }
        }
        else {
            const data = await Medicine.find(
                {
                    date: {
                        $gte: year + "-" + "01-01",
                        $lt: year + "-12-31"
                    }
                }
            )
            if(data) {
                return res.json({
                    message: "ok",
                    data
                })
            }
            else {
                return res.json({message: "no data"})
            }
        }
    }
})


export default router