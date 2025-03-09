import express from 'express'
import User from '../model/user.js'
import Medicine from '../model/medicine.js';
import MedicinePurchase from '../model/medicine-purchase.js';
import supplier from '../model/supplier.js'
import Supplier from '../model/supplier.js';

const router = express.Router();

router.route("/")
.post(async (req, res) => {
    const body = await req.body
    const username = body.username, password = body.password;

    const data = await User.findOne({
        username,
        password
    })

    if(data) {
        res.cookie("user", username)

        return res.json({
            statusbar: 200,
            message: 'ok'
        })
    }

    else {
        return res.json({statusbar: 404, message: "No User Found"})
    }
})
.get(async (req, res) => {

    let cookie = await req.cookies.user

    let date = new Date()
    let onlyDate = (date.getDate()).toString().length == 1 ? `0${date.getDate()}` : date.getDate()
    let month = (date.getMonth() + 1).toString().length == 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

    let finalDate = `${date.getFullYear()}-${month}-${onlyDate}`

    const data = await User.find()
    const stock = await Medicine.find()


    let medicinePurchase;

    if(cookie == 'admin') {
        medicinePurchase = await MedicinePurchase.find({
            date: finalDate,
        })
    }
    else {
        medicinePurchase = await MedicinePurchase.find({
            date: finalDate,
            user: cookie
        })
    }

    const supplier = await Supplier.find().limit(10)

    
    return res.json({
        message: 'ok',
        users: data.length,
        medicines: stock,
        sell: medicinePurchase.length,
        supplier
    })
})

.patch(async(req, res) => {
    res.clearCookie("user")
    return res.json({
        message: "ok"
    })
})


export default router