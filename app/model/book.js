/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('epubbook');

  const BookSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: { type: String },
    cover: { type: String },
    url: { type: String },
    createTime: { type: String },
  });

  return conn.model('Book', BookSchema);
};

