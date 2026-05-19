const { getNearbyItems } = require('../../services/user/itemService');

exports.getNearbyItems = async (req, res) => {
    try {
        const { lat, lng, radius } = req.query;
        const stores = await getNearbyItems({ lat, lng, radius });
        res.status(200).json({ success: true, data: { stores } });
    } catch (err) {
        if (err.code === 'MISSING_LOCATION') {
        return res.status(400).json({
            success: false,
            message: err.message,
            error: { code: err.code, fields: err.fields },
        });
        }
        res.status(err.status || 500).json({
        success: false,
        message: err.message,
        error: { code: err.code },
        });
    }
};