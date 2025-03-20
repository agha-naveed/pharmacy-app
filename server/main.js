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
import customer from './routes/customer.js'
import Customer from './model/customer.js'
import checkExpiration from './routes/checkExpiration.js'
import report from './routes/report.js'
import payments from './routes/payments.js'


const app = express()

app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/ali_pharmacy_store")
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

app.use('/report/api', report)

app.use('/customer/api', customer)

app.use('/payments/api', payments)

app.use('/check-expiry/api', checkExpiration)

app.get('/print/:id/date/:q_date/api', async (req, res) => {

    const { id, q_date } = req.params


    if(id.slice(-12) == "+p_w_id_name") {
        
        const data = await MedicinePurchase.find({
            patient_name: id.slice(0, -12),
            date: q_date
        })
    
        if(data) {
            return res.json({
                message: "ok",
                data,
            })
        }
        else {
            return res.json({
                message: "Not found!"
            })
        }

    }

    else {

        const data = await MedicinePurchase.find({
            id: id,
            date: q_date
        })

        const cell = await Customer.findById(id)

        if(data) {
            return res.json({
                message: "ok",
                data,
                cell: cell.cell
            })
        }
        else {
            return res.json({
                message: "Not found!"
            })
        }
    }

})

module.exports = (req, res) => {
    app(req, res);  // Express does the work of handling requests
};