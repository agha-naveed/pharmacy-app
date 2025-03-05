import express from 'express'
import Medicine from '../model/medicine.js'

const router = express.Router();

router.route("/")
.post(async (req, res) => {
    const body = await req.body


})
.get(async (req, res) => {
    // await Medicine.
})

export default router