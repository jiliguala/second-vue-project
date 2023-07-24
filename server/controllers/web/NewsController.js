const NewsService = require("../../services/web/NewsService.js");

const NewsController = {
    getList: async (req, res) => {
        const result = await NewsService.getList({ _id: req.params.id }); // 根据ID获取详情和所有列表都走的这个接口
        res.send({
            ActionType: 'ok',
            data: result
        });
    },
    getTopList: async (req, res) => {
        const result = await NewsService.getTopList({ limit: req.query.limit });
        res.send({
            ActionType: 'ok',
            data: result
        });
    }
}

module.exports = NewsController;