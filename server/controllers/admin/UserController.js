const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");

const UserController = {
    login: async (req, res) => {
        const result = await UserService.login(req.body)
        if (result.length === 0) {
            res.send({
                code: '-1',
                msg: '用户名或密码错误'
            });
        } else {
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, '1d'); // 设置token， 过期时间1天 1d
            res.header('Authorization', token); // 建议写成Authorization
            res.send({
                actionType: 'ok',
                data: {
                    _id: result[0]._id,
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0, // 性别 0 1 2
                    introduction: result[0].introduction, // 简介
                    avatar: result[0].avatar, // 头像
                    role: result[0].role //身份角色： 管理员1， 编辑2
                }
            })
        }

    },
    upload: async (req, res) => {
        const { username, gender, introduction } = req.body;
        const token = req.headers['authorization'].split(' ')[1];
        const payload = JWT.verify(token); // 在token中拿到id信息，更新到对应的用户
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : '';
        await UserService.upload({
            _id: payload._id,
            username,
            introduction,
            gender: Number(gender),
            avatar
        });
        let result = {
            username,
            gender: Number(gender),
            introduction
        }
        // if (avatar) result.avatar = avatar; // 是否更新头像 
        if (avatar) result = { ...result, avatar };
        res.send({
            ActionType: 'ok',
            data: result
        });
    },
    add: async (req, res) => {
        const { username, gender, introduction, role, password } = req.body;
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : '';
        await UserService.add({
            username,
            introduction,
            gender: Number(gender),
            avatar,
            role: Number(role),
            password
        });
        res.send({
            ActionType: 'ok'
        });
    },
    getList: async (req, res) => {
        const result = await UserService.getList(req.params);
        res.send({
            ActionType: 'ok',
            data: result
        });
    },
    putList: async (req, res) => {
        const result = await UserService.putList(req.body);
        res.send({
            ActionType: 'ok'
        });
    },
    delList: async (req, res) => {
        const result = await UserService.delList({ _id: req.params.id });
        res.send({
            ActionType: 'ok'
        });
    }
}
module.exports = UserController;