import express from 'express'
import User from '../model/user.js'
import Customer from '../model/customer.js';

const router = express.Router();

router.route("/")
.post(async (req, res) => {
    const body = await req.body
    const name = body.username, date = body.date, cell = body.cell;

    const data = await Customer.insertOne({
        name,
        cell,
        date
    })

    console.log(data)
    if(data) {
        return res.json({
            message: 'ok'
        })
    }

    else {
        return res.json({statusbar: 404, message: "No User Found"})
    }
})
.get(async (req, res) => {

    const data = await User.find()
    const stock = await Medicine.find()

    return res.json({
        message: 'ok',
        users: data.length,
        medicines: stock.length
    })
})


export default router