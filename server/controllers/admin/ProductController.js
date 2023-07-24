const ProductService = require("../../services/admin/ProductService.js");

const ProductController = {
    add: async (req, res) => {
        const { title, introduction, detail } = req.body;
        const cover = req.file ? `/productuploads/${req.file.filename}` : '';
        await ProductService.add({
            title,
            introduction,
            detail,
            cover,
            editTime: new Date()
        });
        res.send({
            ActionType: 'ok'
        });
    },
    updateList: async (req, res) => {
        const { title, introduction, detail, _id } = req.body;
        const cover = req.file ? `/productuploads/${req.file.filename}` : '';
        await ProductService.updateList({
            title,
            introduction,
            detail,
            _id,
            cover,
            editTime: new Date()
        });
        res.send({
            ActionType: 'ok'
        });
    },
    getList: async (req, res) => {
        const result = await ProductService.getList({ _id: req.params.id }); // 根据ID获取详情和所有列表都走的这个接口
        res.send({
            ActionType: 'ok',
            data: result
        });
    },
    delList: async (req, res) => {
        const result = await ProductService.delList({ _id: req.params.id });
        res.send({
            ActionType: 'ok'
        });
    }
}
module.exports = ProductController;