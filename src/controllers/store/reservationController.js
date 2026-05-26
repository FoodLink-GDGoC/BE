const reservationService = require('../../services/store/reservationService');

exports.getReservations = async (req, res, next) => {
    try {
        const { status } = req.query;

        const reservations = await reservationService.getReservations(status);

        res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
};

exports.cancelReservation = async (req, res, next) => {
    try {
        const { reservationId } = req.params;

        const result = await reservationService.cancelReservation(reservationId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.pickupReservation = async (req, res, next) => {
    try {
        const { reservationId } = req.params;

        const result = await reservationService.pickupReservation(reservationId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};