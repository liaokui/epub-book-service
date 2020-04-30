'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('epubbook');

  const UserSchema = new Schema({
    userName: { type: String },
    password: { type: String },
  });

  return conn.model('User', UserSchema);
};
