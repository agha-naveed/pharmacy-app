import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    cnic: {
        type: String,
    },
    gender: {
        type: String,
        Enumerator: ['male', 'female'],
    },
    cell: {
        type: String
    },
    company: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    },
}, { timestamps: true });


const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', userSchema);


export default Supplier;