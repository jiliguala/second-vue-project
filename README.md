# 项目公共配置说明 #


## 初始化项目步骤
```
vue create 项目名
自主选择创建，详细见桌面文档
```

## 本地服务调试
```
起后台web（/admin目录下）：npm run serve
起前台台web（/web目录下）：npm run serve
起服务（/server目录下）：npm run dev 
起数据库(任意目录)：mongo
```

## npm 注册 非常重要
```
npm config set registry https://registry.npm.taobao.org
```
## 全局安装vue 注意node版本问题10.以上
```
npm install -g @vue/cli
```

## 安装node 实现后端接口服务
## 安装express
```
npm install express express-generator -g
express --version
express 项目名称
cd 项目名称
npm install
npm start
http://localhost:3000/users 即可访问
```