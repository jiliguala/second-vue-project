const NewsService = require("../../services/admin/NewsService");

const NewsController = {
    add: async (req, res) => {
        const { title, content, category, isPublish } = req.body;
        const cover = req.file ? `/newsuploads/${req.file.filename}` : '';
        await NewsService.add({
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime: new Date()
        });
        res.send({
            ActionType: 'ok'
        });
    },
    updateList: async (req, res) => {
        const { title, content, category, isPublish, _id } = req.body;
        const cover = req.file ? `/newsuploads/${req.file.filename}` : '';
        await NewsService.updateList({
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            _id,
            cover,
            editTime: new Date()
        });
        res.send({
            ActionType: 'ok'
        });
    },
    getList: async (req, res) => {
        const result = await NewsService.getList({ _id: req.params.id }); // 根据ID获取详情和所有列表都走的这个接口
        res.send({
            ActionType: 'ok',
            data: result
        });
    },
    publish: async (req, res) => {
        const result = await NewsService.publish({
            ...req.body,
            editTime: new Date()
        });
        res.send({
            ActionType: 'ok'
        });
    },
    delList: async (req, res) => {
        const result = await NewsService.delList({ _id: req.params.id });
        res.send({
            ActionType: 'ok'
        });
    }
}
module.exports = NewsController;