import mongoose from "mongoose";

const medicinePurchaseSchema = new mongoose.Schema({
    patientName: {
        type: String,
    },
    medicineName: {
        type: String
    },
    batch_no: {
        type: String,
        unique: true
    },
    quantity: {
        type: Number,
    },
    discount: {
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