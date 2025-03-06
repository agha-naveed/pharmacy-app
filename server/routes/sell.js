import express from 'express'
import Medicine from '../model/medicine.js'
import MedicinePurchase from '../model/medicine-purchase.js'

const router = express.Router();

router.route("/")
.post(async (req, res) => {
  const body = await req.body

  const patientName = body.patientName;
  const productDetails = body.productDetails;
  const date = body.date

  const response = await MedicinePurchase.insertOne({
    patientName,
    details: productDetails,
    date
  })
  if(response) {
    console.log("Success")
    return res.json({
      message: 'ok'
    })
  }

})
.get(async (req, res) => {
  try {
    const { query } = req.query;

    if(query) {
      const medicines = await Medicine.find(
        { name: { $regex: query, $options: "i" } },
        "name"
      ).limit(10);

      res.status(200).json(medicines);
    }

    else {
      const medicine = await MedicinePurchase.find()
      
      if(medicine) {
        return res.json({
          message: 'ok',
          details: medicine
        })
      }
      else {
        return res.json({
          message: "error"
        })
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }

})
.patch(async (req, res) => {
  const body = await req.body

  const id = body.id

  const data = await Medicine.findById(id)

  console.log("data: "+ await data)

  if(data) {
    return res.json({
      message: 'ok',
      fetchData: data
    })
  }
})

export default router