'use strict';

// node.js 文件操作对象
const fs = require('fs');
// node.js 路径操作对象
const path = require('path');
// egg.js Controller
const Controller = require('egg').Controller;
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
// 还有我们这里使用了egg-multipart
const md5 = require('md5');
// formidable
const formidable = require('formidable');

const Stream = require('stream');

class UploadController extends Controller {
  async img() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    // 新建一个文件名
    const filename = md5(stream.filename) + path
      .extname(stream.filename)
      .toLocaleLowerCase();
    // 文件生成绝对路径
    // 当然这里这样市不行的，因为你还要判断一下是否存在文件路径
    const target = path.join(this.config.baseDir, 'app/public/uploads/img', filename);
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      throw err;
    }
    // 文件响应
    ctx.body = {
      status: 'success',
      url: '/public/uploads/img/' + filename,
      msg: '上传成功',
    };
  }
  async epub() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const { title, cover } = stream && stream.fields;


    const resMsg = {
      status: 'success',
      data: {},
      msg: '添加成功',
    };

    if (!title) {
      resMsg.status = 'error';
      resMsg.msg = '标题获取失败';
      ctx.body = resMsg;
      return;
    }
    if (!cover) {
      resMsg.status = 'error';
      resMsg.msg = '封面获取失败';
      ctx.body = resMsg;
      return;
    }


    // 新建一个文件名
    const filename = md5(stream.filename) + path
      .extname(stream.filename)
      .toLocaleLowerCase();
    // 文件生成绝对路径
    // 当然这里这样市不行的，因为你还要判断一下是否存在文件路径
    const target = path.join(this.config.baseDir, 'app/public/uploads/epub', filename);
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      throw err;
    }

    const isNew = await ctx.service.book.checkDuplicate('/public/uploads/epub/' + filename);

    if (!isNew) {
      resMsg.msg = '该图书已存在';
      resMsg.status = 'error';
      ctx.body = resMsg;
      return;
    }


    const coverBuffer = Buffer.from(cover.split('base64,')[1], 'base64');
    const coverStream = new Stream.PassThrough();
    coverStream.end(coverBuffer);
    const coverFileName = md5(title) + '.' + cover.split(';')[0].split('data:')[1].split('/')[1].toLocaleLowerCase();
    const coverTarget = path.join(this.config.baseDir, 'app/public/uploads/img', coverFileName);
    const coverWriteStream = fs.createWriteStream(coverTarget);
    try {
      await awaitWriteStream(coverStream.pipe(coverWriteStream));
    } catch (err) {
      await sendToWormhole(coverStream);
      throw err;
    }

    const url = '/public/uploads/epub/' + filename;
    const coverUrl = '/public/uploads/img/' + coverFileName;
    const res = await ctx.service.book.createBook({ title, url, cover: coverUrl });

    if (!res.id) {
      resMsg.status = 'error';
      resMsg.msg = '添加失败';
    } else {
      resMsg.data = res.id;
    }
    // 文件响应
    ctx.body = resMsg;
  }


  // parse()
  async parse(req) {
    const form = new formidable.IncomingForm();
    return new Promise(resolve => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    });
  }
}

module.exports = UploadController;
