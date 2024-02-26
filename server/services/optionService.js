import { SkatesModel } from '../models/SkatesModel.js';
import { ProtectionModel } from '../models/ProtectionModel.js';
import { GroupLevelModel } from '../models/GroupLevelModel.js';
import { GroupAgeModel } from '../models/GroupAgeModel.js';
import { SubscriptionTypeModel } from '../models/SubscriptionTypeModel.js';

const getSkatesOptions = async () => SkatesModel.find().sort({ size: 1 });

const getProtectionOptions = async () => ProtectionModel.find();

const getLevelOptions = async () => GroupLevelModel.find();

const getAgeOptions = async () => GroupAgeModel.find();

const getSubscriptionOptions = async () => SubscriptionTypeModel.find();

// Get all options
const getAllOptionsSkatesData = async () => {
    const [
        skatesData,
        protectionsData,
        groupsLevelData,
        groupsAgeData,
        subscriptionData
    ] = await Promise.all([
        SkatesModel.find(),
        ProtectionModel.find(),
        GroupLevelModel.find(),
        GroupAgeModel.find(),
        SubscriptionTypeModel.find(),
    ]);

    return {
        skatesData,
        protectionsData,
        groupsLevelData,
        groupsAgeData,
        subscriptionData,
    };
};

const addSkatesOptions = async (data) => SkatesModel.create(data);

const addProtectionOptions = async (data) => ProtectionModel.create(data);

const addLevelOptions = async (data) => GroupLevelModel.create(data);

const addAgeOptions = async (data) => GroupAgeModel.create(data);

const addSubscriptionOptions = async (data) => SubscriptionTypeModel.create(data);

const editSkatesOptions = async (data) => SkatesModel.findByIdAndUpdate(data._id, data, { runValidators: true, new: true });

const editProtectionOptions = async (data) => ProtectionModel.findByIdAndUpdate(data._id, data, { runValidators: true, new: true });

const editLevelOptions = async (data) => GroupLevelModel.findByIdAndUpdate(data._id, data, { runValidators: true, new: true });

const editAgeOptions = async (data) => GroupAgeModel.findByIdAndUpdate(data._id, data, { runValidators: true, new: true });

const editSubscriptionOptions = async (data) => SubscriptionTypeModel.findByIdAndUpdate(data._id, data, { runValidators: true, new: true });

const deleteSkatesOptions = async (optionId) => SkatesModel.findByIdAndDelete(optionId);

const deleteProtectionOptions = async (optionId) => ProtectionModel.findByIdAndDelete(optionId);

const deleteLevelOptions = async (optionId) => GroupLevelModel.findByIdAndDelete(optionId);

const deleteAgeOptions = async (optionId) => GroupAgeModel.findByIdAndDelete(optionId);

const deleteSubscriptionOptions = async (optionId) => SubscriptionTypeModel.findByIdAndDelete(optionId);

export {
    getSkatesOptions,
    getProtectionOptions,
    getLevelOptions,
    getAgeOptions,
    getSubscriptionOptions,
    getAllOptionsSkatesData,
    addSkatesOptions,
    addProtectionOptions,
    addLevelOptions,
    addAgeOptions,
    addSubscriptionOptions,
    editSkatesOptions,
    editProtectionOptions,
    editLevelOptions,
    editAgeOptions,
    editSubscriptionOptions,
    deleteSkatesOptions,
    deleteProtectionOptions,
    deleteLevelOptions,
    deleteAgeOptions,
    deleteSubscriptionOptions,
}