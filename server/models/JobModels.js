import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types

const jobSchema = new mongoose.Schema({
    owner: { type: ObjectId, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: ObjectId, ref: 'Category', default: null },
    description: { type: String, required: true },
    responsibilities: {type: Array, default: []},
    requirements: {type: Array, default: []},
    terms: {type: Array, default: []},
    isAvaliable: { type: Boolean, default: true },
}, { timestamps: true })

const Job = mongoose.model('Job', jobSchema);
export default Job;