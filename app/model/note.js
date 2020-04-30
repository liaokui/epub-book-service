/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('epubbook');

  const NoteSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
    href: { type: String },
    cfi: { type: String },
    word: { type: String },
    type: { type: String },
    underlineClass: { type: String },
    note: { type: String },
    createTime: { type: String },
    updateTime: { type: String },
  });

  return conn.model('Note', NoteSchema);
};

