import express from 'express'
import User from '../model/user.js'

const router = express.Router();

router.route("/")
.get(async (req, res) => {

    let cookie = req.cookies.user

    if(cookie) {
        if(cookie == 'admin') {
            return res.json({
                message: "login",
                name: "admin"
            })
        }
        else {
            return res.json({
                message: "login",
                name: "users"
            })
        }
    }

    else {
        return res.json({
            message: 'logout'
        })
    }
})

export default router