import express from 'express'
import Supplier from '../model/supplier.js';

const router = express.Router();

router.route("/")
.post(async (req, res) => {
    const body = req.body
    const name = body.fullname
    const email = body.email;
    const cnic = body.cnic
    const cell = body.cell
    const gender = body.gender
    const company = body.company
    const date = body.date

    const data = await Supplier.create({
        name,
        email,
        cnic,
        gender,
        cell,
        company,
        date
    })

    if(data) {
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
    const data = await Supplier.find()

    return res.json({
        message: "ok",
        suppliers: data
    })
})

export default router