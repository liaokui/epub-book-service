'use strict';

const Controller = require('egg').Controller;

class BookController extends Controller {

  // 查询列表
  async find() {
    const { ctx } = this;
    const { pageSize = 10, pageNumber = 1, keyword = '' } = ctx.query;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '获取列表成功',
    };
    const list = await ctx.service.book.getList(parseInt(pageSize), parseInt(pageNumber), keyword);
    resMsg.data = {
      list: list.list,
      count: list.count,
    };
    ctx.body = resMsg;
  }

  // 查询详情
  async detail() {
    const { ctx } = this;
    const { id } = ctx.query;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '查询成功',
    };
    const list = await ctx.service.book.getDetail(id);
    if (list.length <= 0) {
      resMsg.status = 'error';
      resMsg.msg = '查询失败';
    } else {
      resMsg.data = list[0];
    }
    ctx.body = resMsg;
  }

  // 删除
  async remove() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '删除成功',
    };
    const res = await ctx.service.book.delete(id);
    if (res.n === 0) {
      resMsg.msg = '图书id不存在';
      resMsg.status = 'error';
    }
    ctx.body = resMsg;
  }
}

module.exports = BookController;
