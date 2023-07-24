const ProductModel = require("../../models/ProductModel");

const ProductService = {
    getList: async ({ _id }) => {
        // editTime: -1 是指按照修改时间倒序
        // 有ID 查询指定详情
        // 无ID 查询所有
        return _id ? ProductModel.find({ _id }) : ProductModel.find().sort({ editTime: -1 });
    }
}

module.exports = ProductService;