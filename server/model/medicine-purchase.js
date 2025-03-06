import mongoose from "mongoose";

const arrayFormat = new mongoose.Schema({
    medicineName: {
        type: String
    },
    batch_no: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    discount: {
        type: Number
    },
    total: {
        type: Number
    }
})

const medicinePurchaseSchema = new mongoose.Schema({
    patientName: {
        type: String,
    },
    details: [arrayFormat],
    date: {
        type: String
    },
    
}, { timestamps: true });


const MedicinePurchase = mongoose.models.MedicinePurchase || mongoose.model('MedicinePurchase', medicinePurchaseSchema);


export default MedicinePurchase;