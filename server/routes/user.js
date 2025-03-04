import express from 'express'
import User from '../model/user.js'

const router = express.Router();

router.route("/")
.get(async (req, res) => {
    const data = await User.find()
    return res.json({
        data
    })
})


export default router