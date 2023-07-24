var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');
var NewsRouter = express.Router();
// 图片上传
const multer = require('multer');
// 指定上传资源路径
const upload = multer({dest: 'public/newsuploads/'});

/**
 * 这里的复杂逻辑放到controllers中处理
 * 涉及到文件上传，普通的post不行，需要加上multer中间件
 */

// 创建新闻
NewsRouter.post('/adminapi/news/add', upload.single('file'), NewsController.add);
// 更新新闻
NewsRouter.post('/adminapi/news/list', upload.single('file'), NewsController.updateList);
// 新闻列表
NewsRouter.get('/adminapi/news/list', NewsController.getList);
// 新闻详情
NewsRouter.get('/adminapi/news/list/:id', NewsController.getList);
// 修改发布状态
NewsRouter.put('/adminapi/news/publish', NewsController.publish);
// 删除新闻
NewsRouter.delete('/adminapi/news/list/:id', NewsController.delList);

module.exports = NewsRouter;