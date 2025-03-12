import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
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
        Enumerator: ['cash', 'credit', 'partial', 'online'],
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
    pills_stock: {
        type: Number
    },
    sell_pills_price: {
        type: Number
    },
    date: {
        type: String
    },
    expiry_date: {
        type: String
    },
    partial_price: {
        type: String
    }
}, { timestamps: true });


medicineSchema.index({ name: 'text' });
const Medicine = mongoose.models.Medicine || mongoose.model('Medicine', medicineSchema);


export default Medicine;