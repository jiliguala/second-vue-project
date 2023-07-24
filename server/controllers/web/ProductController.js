const ProductService = require("../../services/web/ProductService.js");

const ProductController = {
    getList: async (req, res) => {
        const result = await ProductService.getList({ _id: req.params.id }); // 根据ID获取详情和所有列表都走的这个接口
        res.send({
            ActionType: 'ok',
            data: result
        });
    }
}

module.exports = ProductController;