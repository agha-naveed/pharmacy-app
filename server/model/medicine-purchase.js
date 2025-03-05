import mongoose from "mongoose";

const medicinePurchaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    batch_no: {
        type: String,
        unique: true
    },
    stock: {
        type: Number,
    },
    pay_method: {
        type: String,
        Enumerator: ['cash', 'credit'],
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
    },
    packet_price: {
        type: Number
    },
    discount: {
        type: String
    },
    pills_packet: {
        type: Number
    },
    pills_price: {
        type: Number
    },
    sell_pills_price: {
        type: String
    },
    date: {
        type: String
    },
    expiry_date: {
        type: String
    }
}, { timestamps: true });


const MedicinePurchase = mongoose.models.MedicinePurchase || mongoose.model('MedicinePurchase', medicinePurchaseSchema);


export default MedicinePurchase;