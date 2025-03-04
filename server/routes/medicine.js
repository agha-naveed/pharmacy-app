import express from 'express'
import User from '../model/user.js'

const router = express.Router();

router.route("/")
.post(async (req, res) => {
    const body = await req.body
    const name = body.name
    const stock = body.stock
    const batch = body.batch_no
    
    // const username = body.username, password = body.password;

})
.get(async (req, res) => {

    const data = await User.find()

    return res.json({
        message: 'ok',
        users: data.length
    })
})

.patch(async(req, res) => {
    res.clearCookie("user")
    return res.json({
        message: "ok"
    })
})


export default router