'use strict';

const Controller = require('egg').Controller;

class ThemeController extends Controller {

  // 查询
  async find() {
    const { ctx } = this;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '查询成功',
    };
    const detail = await ctx.service.theme.getDetail();
    if (!detail.id) {
      resMsg.status = 'error';
      resMsg.msg = '查询失败';
    } else {
      resMsg.data = detail;
    }
    ctx.body = resMsg;
  }

  // 更新
  async update() {
    const { ctx } = this;
    const params = {};
    const { fontFamily, fontSize, lineHeight, background } = ctx.request.body;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '更新成功',
    };
    if (!fontFamily && !fontSize && !lineHeight && !background) {
      resMsg.status = 'error';
      resMsg.msg = '至少修改一项';
      ctx.body = resMsg;
      return;
    }
    if (fontFamily) {
      params.fontFamily = fontFamily;
    }
    if (fontSize) {
      params.fontSize = fontSize;
    }
    if (lineHeight) {
      params.lineHeight = lineHeight;
    }
    if (background) {
      params.background = background;
    }
    const res = await ctx.service.theme.update(params);
    if (res.n === 0) {
      resMsg.msg = '更新失败';
      resMsg.status = 'error';
    }
    resMsg.data.id = res.id;
    ctx.body = resMsg;
  }
}

module.exports = ThemeController;
