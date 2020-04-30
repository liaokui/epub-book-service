'use strict';

const Service = require('egg').Service;

class BookService extends Service {

  // 获取列表
  async getList(pageSize, pageNumber, keyword) {
    const { ctx } = this;
    const reg = new RegExp(keyword, 'i');
    const count = await ctx.model.Book.countDocuments();
    const list = await ctx.model.Book.find({ userId: ctx.userId, title: { $regex: reg } }).limit(pageSize).skip((pageNumber - 1) * pageSize)
      .sort({ createTime: -1 });
    return {
      list,
      count,
    };
  }

  // 获取详情
  async getDetail(id) {
    const { ctx } = this;
    return await ctx.model.Book.find({ userId: ctx.userId, _id: id });
  }

  // 检查重复
  async checkDuplicate(url) {
    const { ctx } = this;
    const res = await ctx.model.Book.find({ userId: ctx.userId, url });
    return res.length === 0;
  }

  // 创建
  async createBook({ title, url, cover }) {
    const { ctx } = this;
    return await ctx.model.Book.create({
      userId: ctx.userId,
      title,
      url,
      cover,
      createTime: Date(),
    });
  }

  // 删除
  async delete(id) {
    const { ctx } = this;
    return await ctx.model.Book.remove({ userId: ctx.userId, _id: id });
  }
}

module.exports = BookService;
