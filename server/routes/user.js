import express from 'express'
import User from '../model/user.js'
import cookieParser from 'cookie-parser';

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
    
})


export default router