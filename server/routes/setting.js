import express from 'express'
import User from '../model/user.js'
import Cookies from "js-cookie";


const router = express.Router();

router.route("/")
.put(async (req, res) => {
    const body = await req.body
    const username = body.username, password = body.password;

    const data = await User.findOne({
        username,
        password
    })

    
    if(data) {
        res.cookie("user", data._id)

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

    const data = await User.findOne({username: cookie})

    if(data) {
        return res.json({
            message: "ok",
            datas: data
        })
    }
    else {
        return res.json({
            message: 'no data'
        })
    }
})

export default router