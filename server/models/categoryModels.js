import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types

const categorySchema = new mongoose.Schema({
    owner: { type: ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    href: { type: String, required: true },
    isAvaliable: { type: Boolean, default: true },
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);
export default Category;