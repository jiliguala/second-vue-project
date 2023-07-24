const mongoose = require('mongoose');
const Schema = mongoose.Schema

// user模型=======users集合
const NewsType = {
    title: String,
    content: String,
    category: Number, // 新闻分类： 1最新动态 2典型案例 3通知公告
    cover: String, // 封面
    isPublish: Number, //是否发布 0未发布 1已发布
    editTime: Date //最后编辑时间
};
const NewsModel = mongoose.model('news', new mongoose.Schema(NewsType))

module.exports = NewsModel;