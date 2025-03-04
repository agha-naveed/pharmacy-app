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
// .get(async (req, res) => {
//     let cookie = req.cookies.user
    
//     if(cookie) {
//         return res.json({
//             message: "duplicate"
//         })
//     }
//     else {
//         return res.json({
//             message: 'ok'
//         })
//     }
// })
// .patch(async(req, res) => {
//     res.clearCookie("user")
//     return res.json({
//         message: "ok"
//     })

// })


export default router