import { SkatesModel } from "../models/SkatesModel.js";
import { ProtectionModel } from "../models/ProtectionModel.js";
import { GroupAgeModel } from "../models/GroupAgeModel.js";
import { SubscriptionTypeModel } from "../models/SubscriptionTypeModel.js";

const getSkatesOptions = async () => SkatesModel.find().sort({ size: 1 });

const getProtectionOptions = async () => ProtectionModel.find();

const getAgeOptions = async () => GroupAgeModel.find();

const getSubscriptionOptions = async () => SubscriptionTypeModel.find();

// Get all options
const getAllOptionsSkatesData = async () => {
  const [
    skatesData,
    protectionsData,
    groupsAgeData,
    subscriptionData,
  ] = await Promise.all([
    SkatesModel.find().sort({ size: 1 }),
    ProtectionModel.find(),
    GroupAgeModel.find(),
    SubscriptionTypeModel.find(),
  ]);

  return {
    skatesData,
    protectionsData,
    groupsAgeData,
    subscriptionData,
  };
};

const addSkatesOptions = async (data) => SkatesModel.create(data);

const addProtectionOptions = async (data) => ProtectionModel.create(data);

const addAgeOptions = async (data) => GroupAgeModel.create(data);

const addSubscriptionOptions = async (data) =>
  SubscriptionTypeModel.create(data);

const editSkatesOptions = async (data) =>
  SkatesModel.findByIdAndUpdate(data._id, data, {
    runValidators: true,
    new: true,
  });

const editProtectionOptions = async (data) =>
  ProtectionModel.findByIdAndUpdate(data._id, data, {
    runValidators: true,
    new: true,
  });

const editAgeOptions = async (data) =>
  GroupAgeModel.findByIdAndUpdate(data._id, data, {
    runValidators: true,
    new: true,
  });

const editSubscriptionOptions = async (data) =>
  SubscriptionTypeModel.findByIdAndUpdate(data._id, data, {
    runValidators: true,
    new: true,
  });

const deleteSkatesOptions = async (optionId) =>
  SkatesModel.findByIdAndDelete(optionId);

const deleteProtectionOptions = async (optionId) =>
  ProtectionModel.findByIdAndDelete(optionId);

const deleteAgeOptions = async (optionId) =>
  GroupAgeModel.findByIdAndDelete(optionId);

const deleteSubscriptionOptions = async (optionId) =>
  SubscriptionTypeModel.findByIdAndDelete(optionId);

export {
  getSkatesOptions,
  getProtectionOptions,
  getAgeOptions,
  getSubscriptionOptions,
  getAllOptionsSkatesData,
  addSkatesOptions,
  addProtectionOptions,
  addAgeOptions,
  addSubscriptionOptions,
  editSkatesOptions,
  editProtectionOptions,
  editAgeOptions,
  editSubscriptionOptions,
  deleteSkatesOptions,
  deleteProtectionOptions,
  deleteAgeOptions,
  deleteSubscriptionOptions,
};
