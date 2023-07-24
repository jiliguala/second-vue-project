const mongoose = require('mongoose');
const Schema = mongoose.Schema

// user模型=======users集合
const ProductType = {
    title: String, // 产品名称
    introduction: String, // 产品简介
    detail: String, // 详细描述
    cover: String, // 产品图
    editTime: Date // 最后编辑时间
};
const ProductModel = mongoose.model('product', new mongoose.Schema(ProductType))

module.exports = ProductModel;