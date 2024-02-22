import { GroupAgeModel } from '../models/GroupAgeModel.js';
import { GroupLevelModel } from '../models/GroupLevelModel.js';
import { SubscriptionTypeModel } from '../models/SubscriptionTypeModel.js';
import { ProtectionModel } from '../models/ProtectionModel.js';
import { SkatesModel } from '../models/SkatesModel.js';

// Get the necessary data to be sent to the front end before creating a skater
const getAllOptionsSkatesData = async () => {
    const [
        skatesData,
        protectionData,
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
        protectionData,
        groupsLevelData,
        groupsAgeData,
        subscriptionData,
    };
};

const createOption = async (optionNameData, data) => {
    let model;

    // Select the appropriate model based on the property
    switch (optionNameData) {
        case 'skatesData':
            model = SkatesModel;
            break;
        case 'protectionData':
            model = ProtectionModel;
            break;
        case 'groupsLevelData':
            model = GroupLevelModel;
            break;
        case 'groupsAgeData':
            model = GroupAgeModel;
            break;
        case 'subscriptionData':
            model = SubscriptionTypeModel;
            break;
        default:
            throw new Error('Invalid property');
    }

    return await model.create(data);
};


export {
    getAllOptionsSkatesData,
    createOption,
}