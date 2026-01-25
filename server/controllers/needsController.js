import User from "../models/UserModels.js";
import Needs from "../models/needsModel.js";

// Add new needs
export const addNeedsController = async (req, res) => {
    try {
        let needsArray = JSON.parse(req.body.needsData)
        const { _id } = req.user

        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            })
        }

        const needsWithOwner = needsArray.map(needItem => ({
            ...needItem,
            owner: _id
        }));

        await Needs.insertMany(needsWithOwner);

        res.status(200).json({
            success: true,
            error: false,
            message: "Needs added successfully",
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
export const getAllNeedsController = async (req, res) => {
    try {
        const needs = await Needs.find({});
        res.status(200).json({
            success: true,
            error: false,
            message: "Needs fetched successfully",
            needs
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
export const deleteNeedsController = async (req, res) => {
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
        await Needs.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            error: false,
            message: "Needs deleted successfully",
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