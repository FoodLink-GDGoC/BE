const { Reservation, User, Item } = require('../../models');

exports.getReservations = async (status, storeId) => {
    const where = {};

    if (status) {
        where.status = status;
    }

    const reservations = await Reservation.findAll({
        where,
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['userId', 'nickname', 'email']
            },
            {
                model: Item,
                as: 'item',
                where: { storeId },
                attributes: [
                    'itemId',
                    'name',
                    'quantity',
                    'price',
                    'type',
                    'pickup_start',
                    'pickup_end',
                    'image'
                ]
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    return reservations;
};

exports.cancelReservation = async (reservationId) => {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
        const error = new Error('존재하지 않는 예약입니다.');
        error.status = 404;
        throw error;
    }

    if (reservation.status === 'CANCEL') {
        const error = new Error('이미 취소된 예약입니다.');
        error.status = 400;
        throw error;
    }

    await reservation.update({
        status: 'CANCEL'
    });

    return {
        success: true,
        message: `예약 번호 ${reservationId}번이 성공적으로 취소되었습니다.`
    };
};

exports.pickupReservation = async (reservationId) => {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
        const error = new Error('존재하지 않는 예약입니다.');
        error.status = 404;
        throw error;
    }

    if (reservation.status === 'PICKUP') {
        const error = new Error('이미 픽업 완료 처리된 예약입니다.');
        error.status = 400;
        throw error;
    }

    if (reservation.status === 'CANCEL') {
        const error = new Error('취소된 예약은 픽업 완료 처리할 수 없습니다.');
        error.status = 400;
        throw error;
    }

    await reservation.update({
        status: 'PICKUP',
        pickedUpAt: new Date()
    });

    return {
        success: true,
        message: `예약 번호 ${reservationId}번이 픽업 완료 처리되었습니다.`
    };
};