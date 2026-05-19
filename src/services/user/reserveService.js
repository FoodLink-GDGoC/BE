const { Item, Store, Reservation } = require('../../models');
const { Op } = require('sequelize');

const getItemDetail = async (itemId) => {
    const item = await Item.findByPk(itemId, {
        include: [
        { model: Store, as: 'store' },
        {
            model: Reservation,
            as: 'reservations',
            where: { status: { [Op.in]: ['CONFIRMED', 'NOSHOW', 'PICKUP'] } },
            required: false,
        },
        ],
    });

    if (!item) {
        const err = new Error('존재하지 않는 상품이에요.');
        err.code = 'ITEM_NOT_FOUND';
        err.status = 404;
        throw err;
    }

    if (item.status !== 'ACTIVE') {
        const err = new Error('마감된 상품이에요.');
        err.code = 'ITEM_NOT_AVAILABLE';
        err.status = 400;
        throw err;
    }

    const reservedQty = item.reservations.reduce((sum, r) => sum + r.quantity, 0);

    return {
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        type: item.type,
        pickupStart: item.pickup_start,
        pickupEnd: item.pickup_end,
        quantity: item.quantity,
        availableQty: item.quantity - reservedQty,
        reservedQty,
        status: item.status,
        image: item.image,
        store: {
        storeId: item.store.storeId,
        storeName: item.store.storeName,
        address: item.store.address,
        },
    };
};

const createReservation = async (itemId, quantity, userId) => {
    if (!quantity || quantity < 1) {
        const err = new Error('수량은 1개 이상이어야 해요.');
        err.code = 'INVALID_QUANTITY';
        err.status = 400;
        throw err;
    }

    const item = await Item.findByPk(itemId, {
        include: [
        { model: Store, as: 'store' },
        {
            model: Reservation,
            as: 'reservations',
            where: { status: { [Op.in]: ['CONFIRMED', 'PICKUP', 'NOSHOW'] } },
            required: false,
        },
        ],
    });

    if (!item) {
        const err = new Error('존재하지 않는 상품이에요.');
        err.code = 'ITEM_NOT_FOUND';
        err.status = 404;
        throw err;
    }

    if (item.status !== 'ACTIVE') {
        const err = new Error('이미 마감된 상품이에요.');
        err.code = 'ITEM_NOT_AVAILABLE';
        err.status = 400;
        throw err;
    }

    const reservedQty = item.reservations.reduce((sum, r) => sum + r.quantity, 0);
    const availableQty = item.quantity - reservedQty;

    if (quantity > availableQty) {
        const err = new Error('남은 수량이 부족해요.');
        err.code = 'QUANTITY_EXCEEDED';
        err.status = 400;
        err.availableQty = availableQty;
        throw err;
    }

    const reservation = await Reservation.create({
        userId,
        itemId,
        quantity,
        status: 'CONFIRMED',
    });

    return {
        reservationId: reservation.reservationId,
        status: reservation.status,
        quantity: reservation.quantity,
        createdAt: reservation.createdAt,
        item: {
        itemId: item.itemId,
        name: item.name,
        pickupStart: item.pickup_start,
        pickupEnd: item.pickup_end,
        },
        store: {
        storeId: item.store.storeId,
        storeName: item.store.storeName,
        },
    };
};


module.exports = { getItemDetail, createReservation };