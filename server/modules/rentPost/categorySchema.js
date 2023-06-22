const mongoose = require('mongoose');
const schema = mongoose.Schema;
const catSch = new schema({
  title: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    enum: ['room', 'flat', 'apartment'],
  },
  slug_url: { type: String },
  description: { type: String },
  is_active: { type: Boolean, required: true, default: false },
  is_deleted: { type: Boolean, required: true, default: false },
  deleted_at: { type: Date, default: Date.now },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date, default: Date.now },
});
const categorySch = mongoose.model('rentPostCat', catSch);
module.exports = categorySch;
