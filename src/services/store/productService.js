const { Item } = require('../../models');

exports.registerProduct = async (body, storeId) => {
    const {
        name,
        quantity,
        price,
        type,
        pickupStart,
        pickupEnd,
        image
    } = body;

    const missingFields = [];

    if (!name) missingFields.push('name');
    if (quantity === undefined) missingFields.push('quantity');
    if (price === undefined) missingFields.push('price');
    if (!type) missingFields.push('type');
    if (!pickupStart) missingFields.push('pickupStart');
    if (!pickupEnd) missingFields.push('pickupEnd');

    if (missingFields.length > 0) {
        const error = new Error('필수 입력값이 누락되었습니다.');
        error.status = 400;
        error.missingFields = missingFields;
        throw error;
    }

    const item = await Item.create({
        name,
        quantity,
        price,
        type,
        pickup_start: pickupStart,
        pickup_end: pickupEnd,
        image,
        storeId: storeId
    });

    return item;
};