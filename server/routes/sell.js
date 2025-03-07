import express from 'express'
import Medicine from '../model/medicine.js'
import MedicinePurchase from '../model/medicine-purchase.js'
import Customer from '../model/customer.js';

const router = express.Router();

router.route("/")
.post(async (req, res) => {
  const body = await req.body

  const patient_name = body.patientName;
  const medicine_name = body.medicine_name;
  const batch_no = body.batch_no;
  const quantity = body.quantity;
  const pills_price = body.pills_price;
  const discount = body.discount;
  const total = body.total;
  const date = body.date;

  const id = body.id;


  if(id) {
    const response = await MedicinePurchase.insertOne({
      id,
      medicine_name,
      batch_no,
      quantity,
      pills_price,
      discount,
      total,
      date
    })
    if(response) {
      console.log("Success")
      return res.json({
        message: 'ok',
      })
    }
  }

  else {
    const response = await MedicinePurchase.insertOne({
      patient_name,
      medicine_name,
      batch_no,
      quantity,
      pills_price,
      discount,
      total,
      date
    })
    if(response) {
      console.log("Success")
      return res.json({
        message: 'ok',
      })
    }
  }

  

})
.get(async (req, res) => {
  try {
    const { query } = req.query;


      const medicines = await Medicine.find(
        { name: { $regex: query, $options: "i" } },
        "name"
      ).limit(10);

      res.status(200).json({
        message: 'ok',
        medicines
      });


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
.put(async (req, res) => {
  const customers = await Customer.find()

  res.status(200).json({
    message: 'ok',
    customers,
  });
})

export default router


// const medicine = await MedicinePurchase.find()
      
//       if(medicine) {
//         return res.json({
//           message: 'ok',
//           details: medicine
//         })
//       }
//       else {
//         return res.json({
//           message: "error"
//         })
//       }