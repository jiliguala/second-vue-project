// 用JWT生成token

const jsonwebtoken = require('jsonwebtoken');
const secret = 'dujunyan';
const JWT = {
    generate(value, expires) { // 生成token expiresIn过期时间
        return jsonwebtoken.sign(value, secret, { expiresIn: expires })
    },
    verify(token) { // 验证token是否过期
        try {
            return jsonwebtoken.verify(token, secret)
        } catch (e) {
            return false
        }
    }
}

module.exports = JWT;