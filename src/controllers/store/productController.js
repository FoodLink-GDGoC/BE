const productService = require('../services/productService');

exports.registerProduct = async (req, res, next) => {
    try {
        const item = await productService.registerProduct(req.body);

        res.status(201).json({
            success: true,
            message: '상품이 정상적으로 등록되었습니다.',
            data: item
        });
    } catch (error) {
        next(error);
    }
};