import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import api from './routes/api.js'
import user from './routes/user.js'
import adduser from './routes/add-user.js'
import supplier from './routes/supplier.js'
import setting from './routes/setting.js'
import dashboard from './routes/dashboard.js'
import medicine from './routes/medicine.js'
import medicineDetail from './routes/medicine-detail.js'
import sell from './routes/sell.js'
import sellHistory from './routes/sell-history.js'
import MedicinePurchase from './model/medicine-purchase.js'


const app = express()

app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/ali_pharmacy_skd")
.then(() => {
    console.log("Server Connected...")
}).catch(() => console.log("Error while connecting to the server..."))

app.use('/api', api)
app.use('/account/api', user)
app.use('/signup/api', adduser)
app.use('/supplier/api', supplier)
app.use('/setting/api', setting)
app.use('/dashboard/api', dashboard)

app.use('/medicine/api', medicine)
app.use('/medicine-detail/api', medicineDetail)

app.use('/sell/api', sell)
app.use('/sell-history/api', sellHistory)

// app.use('/customers/api', sellHistory)


app.get('/print/:id/api', async (req, res) => {
    const { id } = req.params
    const data = await MedicinePurchase.find({ patient_id: id })


})



app.listen(8000, () => {
    console.log("server running on port: "+ 8000)
})