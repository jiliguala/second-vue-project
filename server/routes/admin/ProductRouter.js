var express = require('express');
const ProductController = require('../../controllers/admin/ProductController.js');
var ProductRouter = express.Router();
// 图片上传
const multer = require('multer');
// 指定上传资源路径
const upload = multer({dest: 'public/productuploads/'});

/**
 * 这里的复杂逻辑放到controllers中处理
 * 涉及到文件上传，普通的post不行，需要加上multer中间件
 */

// 创建产品
ProductRouter.post('/adminapi/product/add', upload.single('file'), ProductController.add);
// 更新产品
ProductRouter.post('/adminapi/product/list', upload.single('file'), ProductController.updateList);
// 产品列表
ProductRouter.get('/adminapi/product/list', ProductController.getList);
// 产品详情
ProductRouter.get('/adminapi/product/list/:id', ProductController.getList);
// 删除产品
ProductRouter.delete('/adminapi/product/list/:id', ProductController.delList);

module.exports = ProductRouter;