import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types

const needsSchema = new mongoose.Schema({
    owner: { type: ObjectId, ref: 'User' },
    category: { type: String, required: true },
    items: {type: Array, default: []},
    isAvaliable: { type: Boolean, default: true },
}, { timestamps: true })

const Needs = mongoose.model('Needs', needsSchema);
export default Needs;