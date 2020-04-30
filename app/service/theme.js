'use strict';

const Service = require('egg').Service;

class ThemeService extends Service {

  // 获取详情
  async getDetail() {
    const { ctx } = this;
    const res = await ctx.model.Theme.find({ userId: ctx.userId });
    if (res.length === 0) {
      return await ctx.service.theme.createTheme();
    }
    return res[0];
  }

  // 创建
  async createTheme() {
    const { ctx } = this;
    return await ctx.model.Theme.create({
      userId: ctx.userId,
      fontFamily: 'MicrosoftYaHei',
      fontSize: 16,
      background: 'default',
      lineHeight: 1.2,
      createTime: Date(),
      updateTime: Date(),
    });
  }

  // 更新
  async update(params) {
    const { ctx } = this;
    return await ctx.model.Theme.update({ userId: ctx.userId }, {
      ...params,
      updateTime: Date(),
    });
  }

}

module.exports = ThemeService;
