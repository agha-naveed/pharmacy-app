import express from 'express'
import User from '../model/user.js'
import Medicine from '../model/medicine.js';
import MedicinePurchase from '../model/medicine-purchase.js';

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
    let date = new Date()
    let onlyDate = (date.getDate()).toString().length == 1 ? `0${date.getDate()}` : date.getDate()
    let month = (date.getMonth() + 1).toString().length == 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

    let finalDate = `${date.getFullYear()}-${month}-${onlyDate}`

    const data = await User.find()
    const stock = await Medicine.find()

    const medicinePurchase = await MedicinePurchase.find({
        date: finalDate
    })

    
    return res.json({
        message: 'ok',
        users: data.length,
        medicines: stock.length,
        sell: medicinePurchase.length
    })
})

.patch(async(req, res) => {
    res.clearCookie("user")
    return res.json({
        message: "ok"
    })
})


export default router