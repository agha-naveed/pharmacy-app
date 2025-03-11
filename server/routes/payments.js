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
    })

    if(user) {
        return res.json({
            message: "ok",
            pay: user
        })
    }
})


export default router