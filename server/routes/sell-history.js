import express from 'express'
import MedicinePurchase from '../model/medicine-purchase.js'

const router = express.Router();

router.route("/")
.get(async (req, res) => {
  let cookie = await req.cookies.user

  const medicine = await MedicinePurchase.find({user: cookie})

    if(medicine) {
        return res.json({
            message: 'ok',
            details: medicine
        })
    }
    else {
        return res.json({
            message: "error"
        })
    }

})
.patch(async (req, res) => {
    let { from, to } = req.query
    let cookie = await req.cookies.user


    if(from && !to) {
        const data = await MedicinePurchase.find({
            date: {
                $gte: from
            },
            user: cookie
        })

        return res.json({
            message: 'ok',
            data
        })
    }
    if(!from && to) {
        const data = await MedicinePurchase.find({
            date: {
                $lte: to
            },
            user: cookie
        })
        return res.json({
            message: 'ok',
            data
        })
    }

    if(from && to) {
        const data = await MedicinePurchase.find({
            date: {
                $gte: from,
                $lte: to
            },
            user: cookie
        })
        return res.json({
            message: 'ok',
            data
        })
    }


    else {
        return res.json({
            message: "No Data"
        })
    }
})
export default router
