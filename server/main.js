import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import user from './routes/user.js'

const app = express()

app.use(cors())
app.use(express.json())


mongoose.connect("mongodb://127.0.0.1:27017/ali_pharmacy_skd")
.then(() => {
    console.log("Server Connected...")
}).catch(() => console.log("Error while connecting to the server..."))


app.use('/account', user)
// router.route('/')
// .get()




app.listen(8000, () => {
    console.log("server running on port: "+ 8000)
})