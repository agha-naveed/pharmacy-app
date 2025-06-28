import mongoose from "mongoose";

const medicinePurchaseSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    user: {
        type: String
    },
    patient_name: {
        type: String,
    },
    medicine_name: {
        type: String
    },
    batch_no: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number
    },
    pills_price: {
        type: Number
    },
    total: {
        type: Number
    },
    date: {
        type: String
    },
    
}, { timestamps: true });


const MedicinePurchase = mongoose.models.MedicinePurchase || mongoose.model('MedicinePurchase', medicinePurchaseSchema);


export default MedicinePurchase;