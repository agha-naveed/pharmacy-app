import express from 'express'
import User from '../model/user.js'

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
    
    if(cookie) {
        return res.json({
            message: "duplicate"
        })
    }
    else {
        return res.json({
            message: 'ok'
        })
    }
})

.patch(async(req, res) => {
    res.clearCookie("user")
    return res.json({
        message: "ok"
    })

})


export default router