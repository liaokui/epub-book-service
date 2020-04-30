'use strict';

const Controller = require('egg').Controller;

class NoteController extends Controller {
  // 查询列表
  async find() {
    const { ctx } = this;
    const { bookId } = ctx.query;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '获取列表成功',
    };
    if (!bookId) {
      resMsg.status = 'error';
      resMsg.msg = '获取图书id失败';
      ctx.body = resMsg;
      return;
    }
    const list = await ctx.service.note.getList(bookId);
    resMsg.data = list;
    ctx.body = resMsg;
  }
  // 创建
  async create() {
    const { ctx } = this;
    const { bookId, href, cfi, word, type, underlineClass } = ctx.request.body;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '创建成功',
    };

    if (!bookId) {
      resMsg.status = 'error';
      resMsg.msg = '获取图书id失败';
      ctx.body = resMsg;
      return;
    }
    if (!href || !cfi || !word || !type || !underlineClass) {
      resMsg.status = 'error';
      resMsg.msg = '请填写完整的笔记信息';
      ctx.body = resMsg;
      return;
    }

    const res = await ctx.service.note.create();
    if (!res.id) {
      resMsg.msg = '创建失败';
      resMsg.status = 'error';
    } else {
      resMsg.data.id = res.id;
    }
    ctx.body = resMsg;
  }
  // 更新
  async update() {
    const { ctx } = this;
    const { id, bookId, type, underlineClass, note } = ctx.request.body;
    const params = {};
    const resMsg = {
      status: 'success',
      data: {},
      msg: '更新成功',
    };
    if (!id || !bookId) {
      resMsg.status = 'error';
      resMsg.msg = '获取笔记id或图书id失败';
      ctx.body = resMsg;
      return;
    }
    if (type) {
      params.type = type;
    }
    if (underlineClass) {
      params.underlineClass = underlineClass;
    }
    if (note) {
      params.note = note;
    }
    const res = await ctx.service.note.update(id, bookId, params);
    console.log(res);
    if (res.n === 0) {
      resMsg.msg = '更新失败';
      resMsg.status = 'error';
    }
    resMsg.data.id = res.id;
    ctx.body = resMsg;
  }
  // 删除
  async remove() {
    const { ctx } = this;
    const { id, bookId } = ctx.request.body;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '删除成功',
    };
    if (!id || !bookId) {
      resMsg.status = 'error';
      resMsg.msg = '获取笔记id或图书id失败';
      ctx.body = resMsg;
      return;
    }
    const res = await ctx.service.note.delete(id, bookId);
    if (res.n === 0) {
      resMsg.msg = '删除失败';
      resMsg.status = 'error';
    }
    ctx.body = resMsg;
  }
}

module.exports = NoteController;
