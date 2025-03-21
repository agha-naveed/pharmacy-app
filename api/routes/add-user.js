import express from 'express'
import User from '../model/user.js'

const router = express.Router();

router.route("/")
.post(async (req, res) => {
    const body = await req.body

    const fName = body.first_name, lName = body.last_name;
    const username = body.username, password = body.password;

    const data = await User.insertOne({
        first_name: fName,
        last_name: lName,
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