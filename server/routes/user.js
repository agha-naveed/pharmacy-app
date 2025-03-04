import express from 'express'
import User from '../model/user'

const router = express.Router();

router.route("/account")
.get(async (req, res) => {
    const data = await User.find()
    return res.json({
        data
    })
})


export default router