'use strict';

const Service = require('egg').Service;

class NoteService extends Service {
  // 获取列表
  async getList(bookId) {
    const { ctx } = this;
    const list = await ctx.model.Note.find({ userId: ctx.userId, bookId }).sort({ createTime: -1 });
    return list;
  }

  // 创建
  async create() {
    const { ctx } = this;
    return await ctx.model.Note.create({
      userId: ctx.userId,
      bookId: ctx.request.body.bookId,
      href: ctx.request.body.href,
      cfi: ctx.request.body.cfi,
      word: ctx.request.body.word,
      type: ctx.request.body.type,
      underlineClass: ctx.request.body.underlineClass,
      note: ctx.request.body.note,
      createTime: Date(),
      updateTime: Date(),
    });
  }

  // 更新
  async update(id, bookId, params) {
    const { ctx } = this;
    console.log(id);
    console.log(params);
    return await ctx.model.Note.updateOne({ _id: id }, {
      ...params,
      updateTime: Date(),
    });
  }

  // 删除
  async delete(id, bookId) {
    const { ctx } = this;
    return await ctx.model.Note.remove({ userId: ctx.userId, _id: id, bookId });
  }
}

module.exports = NoteService;
