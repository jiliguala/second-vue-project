const NewsModel = require("../../models/NewsModel");

const NewsService = {
    getList: async ({ _id }) => {
        // 查询已发布的新闻 按照修改时间倒序
        // 有ID 查询指定详情
        // 无ID 查询所有
        return _id ? NewsModel.find({ _id, isPublish: 1 }) : NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 });
    },
    getTopList: async ({ limit }) => {
        return NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit);
    }
}

module.exports = NewsService;