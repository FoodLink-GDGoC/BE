const { getItemDetail, createReservation } = require('../../services/user/reserveService');

exports.getItemDetail = async (req, res) => {
    try {
        const { itemId } = req.params;
        const result = await getItemDetail(itemId);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(err.status || 500).json({
        success: false,
        message: err.message,
        error: { code: err.code },
        });
    }
};

exports.createReservation = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        const userId = req.user.userId;

        const result = await createReservation(itemId, quantity, userId);
        res.status(201).json({
        success: true,
        message: '예약이 완료됐어요.',
        data: result,
        });
    } catch (err) {
        if (err.code === 'QUANTITY_EXCEEDED') {
        return res.status(400).json({
            success: false,
            message: err.message,
            error: { code: err.code, availableQty: err.availableQty },
        });
        }
        res.status(err.status || 500).json({
        success: false,
        message: err.message,
        error: { code: err.code },
        });
    }
};
