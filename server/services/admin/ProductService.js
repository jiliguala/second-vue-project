const ProductModel = require("../../models/ProductModel");

const ProductService = {
    add: async ({ title, introduction, detail, cover, editTime }) => {
        return ProductModel.create({
            title, introduction, detail, cover, editTime
        });
    },
    updateList: async ({ _id, title, introduction, detail, cover, editTime }) => {
        let result = {
            title,
            introduction,
            detail,
            editTime
        }
        if (cover) result = { ...result, cover };
        return ProductModel.updateOne({_id}, result);
    },
    getList: async ({ _id }) => {
        return _id ? ProductModel.find({ _id }) : ProductModel.find({});
    },
    delList: async ({ _id }) => {
        return ProductModel.deleteOne({ _id });
    }
}
module.exports = ProductService;