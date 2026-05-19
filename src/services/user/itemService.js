const { Item, Store } = require('../../models');

const getNearbyItems = async ({ lat, lng, radius = 500 }) => {
    if (!lat || !lng) {
        const err = new Error('현재 위치 정보가 필요합니다.');
        err.code = 'MISSING_LOCATION';
        err.fields = [...(!lat ? ['lat'] : []), ...(!lng ? ['lng'] : [])];
        err.status = 400;
        throw err;
    }

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    if (isNaN(latNum) || isNaN(lngNum) ||
        latNum < -90 || latNum > 90 ||
        lngNum < -180 || lngNum > 180) {
        const err = new Error('올바르지 않은 위치 정보입니다.');
        err.code = 'INVALID_COORDINATES';
        err.status = 400;
        throw err;
    }

    const stores = await Store.findAll({
        where: { is_verified: true },
        include: [{
        model: Item,
        as: 'items',
        where: { status: 'ACTIVE' },
        required: false,
        }],
    });

    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371000;

    const nearbyStores = stores
        .map((store) => {
        const dLat = toRad(store.lat - latNum);
        const dLng = toRad(store.lng - lngNum);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(latNum)) * Math.cos(toRad(store.lat)) * Math.sin(dLng / 2) ** 2;
        const distance = Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
        return { store, distance };
        })
        .filter(({ distance }) => distance <= radius)
        .sort((a, b) => a.distance - b.distance);

    return nearbyStores.map(({ store, distance }) => ({
        storeId: store.storeId,
        storeName: store.storeName,
        address: store.address,
        lat: store.lat,
        lng: store.lng,
        distance,
        items: store.items.map((item) => ({
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        type: item.type,
        pickupEnd: item.pickup_end,
        status: item.status,
        availableQty: item.quantity,
        image: item.image,
        })),
    }));
};

module.exports = { getNearbyItems };