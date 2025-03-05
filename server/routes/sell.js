import express from 'express'
import Medicine from '../model/medicine.js'

const router = express.Router();

router.route("/")
.post(async (req, res) => {
    const body = await req.body


})
.get(async (req, res) => {
  try {
    const { query } = req.query;
    const medicines = await Medicine.find(
      { name: { $regex: query, $options: "i" } },
      "name"
    ).limit(10);

    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }

})

export default router