# 后端服务


## 每次修改代码 项目总会重启服务器 dev实现热更新
```
npm install -g node-dev
server/package.json文件修改 ---- "dev": "node-dev ./bin/www"
启动由npm start 改为 npm run dev 可实现热更新
```

## 启动服务 start启动服务 dev热更新服务
```
npm start 
npm run dev
```

## 安装mongoose 作为本项目数据库
```
npm i mongoose --save
```
# 安装mongodb
## mongodb的启动，进入：cd /usr/local/mongodb，在终端输入:mongod --fork -dbpath data --logpath log/mongo.log --logappend
## 重新打开一个终端，输入cd /usr/local/mongodb命令进入mongodb目录下，输入mongo
## mongodb的关闭  进入以上界面中输入use admin回车,然后输入db.shutdownServer()