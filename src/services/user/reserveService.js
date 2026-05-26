const { Item, Store, Reservation, User, sequelize } = require('../../models');
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

    const reservation = await sequelize.transaction(async (t) => {
        const reservation = await Reservation.create({
            userId,
            itemId,
            quantity,
            status: 'CONFIRMED',
        }, { transaction: t });

        if (quantity === availableQty) {
            await item.update({ status: 'RESERVED' }, { transaction: t });
        }

        return reservation;
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

const getReservations = async (userId) => {
    const reservations = await Reservation.findAll({
        where: { userId },
        include: [
        {
            model: Item,
            as: 'item',
            include: [{ model: Store, as: 'store' }],
        },
        ],
        order: [['createdAt', 'DESC']],
    });

    return reservations.map((r) => ({
        reservationId: r.reservationId,
        quantity: r.quantity,
        status: r.status,
        createdAt: r.createdAt,
        pickedUpAt: r.pickedUpAt,
        item: {
            itemId: r.item.itemId,
            name: r.item.name,
            price: r.item.price,
            type: r.item.type,
            pickupStart: r.item.pickup_start,
            pickupEnd: r.item.pickup_end,
            image: r.item.image,
        },
        store: {
            storeId: r.item.store.storeId,
            storeName: r.item.store.storeName,
        },
    }));
};

const getReservationDetail = async (reservationId, userId) => {
    const reservation = await Reservation.findByPk(reservationId, {
        include: [
        {
            model: Item,
            as: 'item',
            include: [{ model: Store, as: 'store' }],
        },
        { model: User, as: 'user' },
        ],
    });

    if (!reservation) {
        const err = new Error('존재하지 않는 예약이에요.');
        err.code = 'RESERVATION_NOT_FOUND';
        err.status = 404;
        throw err;
    }

    if (reservation.userId !== userId) {
        const err = new Error('접근 권한이 없어요.');
        err.code = 'FORBIDDEN';
        err.status = 403;
        throw err;
    }

    return {
        reservationId: reservation.reservationId,
        quantity: reservation.quantity,
        status: reservation.status,
        createdAt: reservation.createdAt,
        pickedUpAt: reservation.pickedUpAt,
        item: {
            itemId: reservation.item.itemId,
            name: reservation.item.name,
            price: reservation.item.price,
            type: reservation.item.type,
            pickupStart: reservation.item.pickup_start,
            pickupEnd: reservation.item.pickup_end,
            image: reservation.item.image,
            store: {
                storeId: reservation.item.store.storeId,
                storeName: reservation.item.store.storeName,
                address: reservation.item.store.address,
            },
        },
        user: {
            userId: reservation.user.userId,
            nickname: reservation.user.nickname,
            email: reservation.user.email,
        },
    };
};



module.exports = { getItemDetail, createReservation, getReservations, getReservationDetail };