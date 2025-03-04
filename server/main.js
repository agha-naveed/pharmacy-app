import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import user from './routes/user.js'
import adduser from './routes/add-user.js'
import supplier from './routes/supplier.js'
import setting from './routes/setting.js'

const app = express()

app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/ali_pharmacy_skd")
.then(() => {
    console.log("Server Connected...")
}).catch(() => console.log("Error while connecting to the server..."))


app.use('/account/api', user)
app.use('/signup/api', adduser)
app.use('/supplier/api', supplier)
app.use('/setting/api', setting)

// router.route('/')
// .get()




app.listen(8000, () => {
    console.log("server running on port: "+ 8000)
})