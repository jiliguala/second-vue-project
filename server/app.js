var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const NewsRouter = require('./routes/admin/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const webNewsRouter = require('./routes/web/NewsRouter');
const webProductRouter = require('./routes/web/ProductRouter');
const JWT = require('./util/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * /adminapi/* - 后台系统用的api
 * /webapi/* - 企业官网用的api
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
// web端的api 无需做token校验
app.use(webNewsRouter); // 注册新建的路由 web 新闻列表
app.use(webProductRouter); // 注册新建的路由 web 产品列表

// 校验token
app.use((req, res, next) => {
  // 在中间件中处理token
  // 如果token有效，就next
  // 如果过期了，就返回401错误
  // 如是login本就不包含token，所以要排除此页面
  if (req.url === '/adminapi/user/login') {
    next();
    return;
  }
  const token = req.headers['authorization'].split(' ')[1];
  if (token) {
    const payload = JWT.verify(token); // 页面token
    if (payload) {
      const newToken = JWT.generate({
        _id: payload._id,
        username: payload.username
      }, '1d'); // 重新设置token， 过期时间1天 1d
      res.header('Authorization', newToken); // 建议写成Authorization
      next();
    } else {
      res.status(401).send({ code: '-1', msg: 'token已过期' });
    }
  }
});
// admin端的api 需要做token校验 放在校验token之后
app.use(UserRouter); // 注册新建的路由 用户相关
app.use(NewsRouter); // 注册新建的路由 新闻相关
app.use(ProductRouter); // 注册新建的路由 产品相关

/**
 * end
 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
