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
        Enumerator: ['cash', 'credit'],
    },
    supplier: {
        type: Schema.Types.ObjectId,
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


const Medicines = mongoose.models.Medicine || mongoose.model('Medicine', medicineSchema);


export default Medicines;