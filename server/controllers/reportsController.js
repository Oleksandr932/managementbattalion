import User from "../models/UserModels.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Reports from "../models/reportsModals.js";

// Add new reports
export const addReportsController = async (req, res) => {
    try {
        let reports = JSON.parse(req.body.reportsData)
        const imageFile = req.file
        const { _id } = req.user

        const user = await User.findById(_id)
        if (!user) {
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
            folder: "/162OMBr/reports"
        })
        // generation url for image from respons imagekit
        const imageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '1280' },   // Resize to width 1280
                { quality: 'auto' }, // Auto compression 
                { format: 'webp' }   // Convert to modern image format
            ]
        })
        const image = imageUrl

        await Reports.create({ ...reports, image, owner: _id })

        res.status(200).json({
            success: true,
            error: false,
            message: "Reports added successfully",
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

// Get all reports
export const getAllReportsController = async (req, res) => {
    try {
        const reports = await Reports.find({});
        res.status(200).json({
            success: true,
            error: false,
            message: "Reports fetched successfully",
            reports
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

// Delete reports
export const deleteReportsController = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = req.user
        const user = await User.findById(_id)
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            })
        }
        await Reports.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            error: false,
            message: "Reports deleted successfully",
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