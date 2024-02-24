const mongoose = require('mongoose');
const schema = mongoose.Schema;
const subCatSch = new schema({
  category: {
    type: schema.Types.ObjectId,
    required: true,
    ref: 'rentPostCat',
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  slug_url: { type: String },
  description: { type: String },
  published_on: { type: Date, default: Date.now },
  is_published: { type: Boolean, required: true, default: true },
  is_active: { type: Boolean, required: true, default: false },
  is_deleted: { type: Boolean, required: true, default: false },
  deleted_at: { type: Date, default: Date.now },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date, default: Date.now },
});
const subCategorySch = mongoose.model('rentPostSubCat', subCatSch);
module.exports = subCategorySch;
