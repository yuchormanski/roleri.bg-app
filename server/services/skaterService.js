import { SkaterModel } from '../models/SkaterModel.js';

const populateFields = ['skatesSize', 'protection', 'groupLevel'];

const populateSkater = (query) => {
    return query.populate(populateFields.join(' '));
};

const getAllSkaters = async () => populateSkater(SkaterModel.find());

const getSkaterById = async (skaterId) => populateSkater(SkaterModel.findById(skaterId));

const addSkater = async (userParentId, skaterData) => {
    const skater = await SkaterModel.create({ ...skaterData, owner: userParentId });
    return populateSkater(SkaterModel.findById(skater._id));
};

const updateSkater = async (skaterId, skaterData) => {
    const skater = await SkaterModel.findByIdAndUpdate(skaterId, skaterData, { runValidators: true, new: true });
    return populateSkater(skater);
};

const deleteSkater = async (skaterId) => {
    const skater = await SkaterModel.findByIdAndDelete(skaterId);
    return populateSkater(skater);
};

export {
    getAllSkaters,
    getSkaterById,
    addSkater,
    updateSkater,
    deleteSkater,
};
