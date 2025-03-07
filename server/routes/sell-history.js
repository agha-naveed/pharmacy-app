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
export default router
