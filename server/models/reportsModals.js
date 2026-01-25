import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types

const reportsSchema = new mongoose.Schema({
    owner: { type: ObjectId, ref: 'User' },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    isAvaliable: { type: Boolean, default: true },
}, { timestamps: true })

const Reports = mongoose.model('Reports', reportsSchema);
export default Reports;