const UserModel = require("../../models/UserModel");

const UserService = {
    login: async (username, password) => {
        return UserModel.find(username, password);
    },
    upload: async ({ _id, username, introduction, gender, avatar }) => {
        let result = {
            username,
            introduction,
            gender
        }
        // if (avatar) result.avatar = avatar; // 是否更新头像
        if (avatar) result = { ...result, avatar };
        return UserModel.updateOne({ _id }, result);
    },
    add: async ({ username, introduction, gender, avatar, role, password }) => {
        return UserModel.create({
            username,
            introduction,
            gender,
            avatar,
            role,
            password
        });
    },
    getList: async ({ id }) => {
        return id ? UserModel.find({_id: id}) : UserModel.find({}, { password: 0 }); //排除密码字段的返回
        // return UserModel.find({}, ['username', 'role', 'introduction']); //指定哪些字段返回
    },
    putList: async (body) => {
        return UserModel.updateOne({ _id: body._id }, body);
    },
    delList: async ({ _id }) => {
        return UserModel.deleteOne({ _id });
    }
}
module.exports = UserService;