import express from 'express'
import MedicinePurchase from '../model/medicine-purchase.js'

const router = express.Router();

router.route("/")
.get(async (req, res) => {
  const medicine = await MedicinePurchase.find()
      
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
