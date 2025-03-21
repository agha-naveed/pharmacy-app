import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    cell: {
        type: String
    },
    date: {
        type: String
    },
    
}, { timestamps: true });


const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);


export default Customer;