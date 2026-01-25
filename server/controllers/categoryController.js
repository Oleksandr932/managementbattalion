import User from "../models/UserModels.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Category from "../models/categoryModels.js";

// Add new category
export const addCategoryController = async (req, res) => {
    try {
        let category = JSON.parse(req.body.categoryData)
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
            folder: "/162OMBr/category"
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
        const href = imageUrl

        await Category.create({ ...category, href, owner: _id })

        res.status(200).json({
            success: true,
            error: false,
            message: "Category added successfully",
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

// Get all category
export const getAllCategoryController = async (req, res) => {
    try {
        const reports = await Category.find({});
        res.status(200).json({
            success: true,
            error: false,
            message: "Category fetched successfully",
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

// Delete category
export const deleteCategoryController = async (req, res) => {
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
        await Category.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            error: false,
            message: "Category deleted successfully",
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