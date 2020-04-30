'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');

class LoginService extends Service {
  async getCaptcha() {
    return svgCaptcha.create({
      width: 80,
      height: 38,
      background: '#D6E8ED',
    });
  }
  checkCaptcha(code) {
    const { ctx } = this;
    code = code.toLowerCase();
    const sessCode = ctx.session.code ? ctx.session.code.toLowerCase() : null; // 拿到之前存在session中的验证码
    // 进行验证
    if (code === sessCode) {
      // 成功后验证码作废
      ctx.session.code = null;
    }
    return code === sessCode;
  }
  // 登录操作
  async login({ username, password }) {
    const { ctx, app } = this;
    const userData = await ctx.model.User.find({
      userName: username,
      password,
    }, { password: 0, __v: 0 });
    // 找不到则返回false
    if (userData.length === 0) {
      return false;
    }
    // 找到则以用户id生成token
    const token = jwt.sign({
      id: userData[0]._id,
    }, app.config.jwt.cert, {
      expiresIn: '10h', // token过期时间
    });
    return {
      user: userData[0],
      token,
    };
  }

}

module.exports = LoginService;
