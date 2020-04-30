/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('epubbook');

  const ThemeSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    fontFamily: { type: String },
    fontSize: { type: Number },
    lineHeight: { type: Number },
    background: { type: String },
    createTime: { type: String },
    updateTime: { type: String },
  });

  return conn.model('Theme', ThemeSchema);
};
