import express from 'express'
import User from '../model/user.js'
import Cookies from "js-cookie";


const router = express.Router();

router.route("/")
.put(async (req, res) => {
    let cookie = await req.cookies.user

    const body = await req.body
    const username = body.username, first_name = body.first_name, last_name = body.last_name;

    const data = await User.updateOne({
        username: cookie
    },
    {
        $set: {
            first_name,
            last_name,
        }
    })
    
    if(data) {
        return res.json({
            status: 200,
            message: 'ok'
        })
    }

    else {
        return res.json({status: 404, message: "No User Found"})
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