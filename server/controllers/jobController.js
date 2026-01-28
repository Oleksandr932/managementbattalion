import User from "../models/UserModels.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Job from "../models/JobModels.js";

// Add new job
export const addJobController = async (req, res) => {
    try {
        let job = JSON.parse(req.body.jobData)
        const imageFile = req.file
        const { _id } = req.user

        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            })
        }

        // upload image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/162OMBr/jobs"
        })
        // generation url for image from respons imagekit
        const imageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {width: '1280'},   // Resize to width 1280
                {quality: 'auto'}, // Auto compression 
                {format: 'webp'}   // Convert to modern image format
            ]
        })
        const image = imageUrl

        await Job.create({ ...job, image, owner: _id })

        res.status(200).json({
            success: true,
            error: false,
            message: "Job added successfully",
        })
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
};

// Get all job
export const getAllJobController = async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.status(200).json({
            success: true,
            error: false,
            message: "Job fetched successfully",
            jobs
        })
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
};

// Get job by id
export const getJobByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        res.status(200).json({
            success: true,
            error: false,
            message: "Job fetched successfully",
            job
        })
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
};

// Edit job by id
export const editJobByIdController = async (req, res) => {
    try {
        let job = JSON.parse(req.body.jobData)
        const { id } = req.params;
        const imageFile = req.file // може бути undefined
        const { _id } = req.user

        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            })
        }

        let imageUrl = null;

        if (imageFile) {
            // upload image to ImageKit
            const fileBuffer = fs.readFileSync(imageFile.path);
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/162OMBr/jobs"
            })
            // generate url for image from respons imagekit
            imageUrl = imagekit.url({
                path: response.filePath,
                transformation: [
                    {width: '1280'},   // Resize to width 1280
                    {quality: 'auto'}, // Auto compression 
                    {format: 'webp'}   // Convert to modern image format
                ]
            })
            // OPTIONAL: видалити тимчасовий файл на сервері якщо multer зберігає його локально
            try {
                fs.unlinkSync(imageFile.path)
            } catch (e) {
                console.warn('Could not remove temp file', e.message || e)
            }
        }

        // Підготовка об'єкта для оновлення
        const updateData = { ...job };
        if (imageUrl) updateData.image = imageUrl;

        await Job.findByIdAndUpdate(id, updateData)

        res.status(200).json({
            success: true,
            error: false,
            message: "Job updated successfully",
        })
    } catch (error) {
        console.log(error.message || error);
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
};

// Delete job
export const deleteJobController = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = req.user

        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            })
        }
        await Job.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            error: false,
            message: "Job deleted successfully",
        })
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
};