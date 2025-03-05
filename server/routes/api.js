import express from 'express'
import User from '../model/user.js'

const router = express.Router();

router.route("/")
.get(async (req, res) => {

    let cookie = req.cookies.user
    
    if(cookie) {
        return res.json({
            message: "login"
        })
    }

    else {
        return res.json({
            message: 'logout'
        })
    }
})

export default router