var express = require('express');
const UserController = require('../../controllers/admin/UserController');
var UserRouter = express.Router();
// 图片上传
const multer = require('multer');
// 指定上传资源路径
const upload = multer({dest: 'public/avataruploads/'});

/**
 * 这里的复杂逻辑放到controllers中处理
 * 涉及到文件上传，普通的post不行，需要加上multer中间件
 */

// 登录
UserRouter.post('/adminapi/user/login', UserController.login);

// 更新用户信息
UserRouter.post('/adminapi/user/upload', upload.single('file'), UserController.upload);

// 添加用户
UserRouter.post('/adminapi/user/add', upload.single('file'), UserController.add);
// 用户列表
UserRouter.get('/adminapi/user/list', UserController.getList);
// 查询指定用户信息
UserRouter.get('/adminapi/user/list/:id', UserController.getList);
// 修改用户信息
UserRouter.put('/adminapi/user/list/:id', UserController.putList);
// 删除用户
UserRouter.delete('/adminapi/user/list/:id', UserController.delList);

module.exports = UserRouter;
