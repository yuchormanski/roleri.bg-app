import { SkaterModel } from '../models/SkaterModel.js';

const getAllSkaters = async () => SkaterModel.find();

const getSkaterById = async (skaterId) => SkaterModel.findById(skaterId);

const addSkater = async (userParentId, skaterData) => SkaterModel.create({ ...skaterData, owner: userParentId });

const updateSkater = async (skaterId, skaterData) => SkaterModel.findByIdAndUpdate(skaterId, skaterData, { runValidators: true, new: true });

const deleteSkater = async (skaterId) => SkaterModel.findByIdAndDelete(skaterId);


export {
    getAllSkaters,
    getSkaterById,
    addSkater,
    updateSkater,
    deleteSkater,
}