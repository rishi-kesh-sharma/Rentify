const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rentPostSchema = new schema({
  title: { type: String },
  description: { type: String },
  short_description: { type: String },
  meta_tag: { type: [String] },
  meta_description: { type: String },
  tags: { type: [String] },
  posted_by: { type: schema.Types.ObjectId, ref: 'users' },
  keywords: { type: [String] },
  slug_url: { type: String },
  likes: { type: [schema.Types.ObjectId] },
  saves: { type: [schema.Types.ObjectId] },
  location: { province: String, district: String, municipality: String, area: String },
  map_iframe: {
    type: String,
  },
  price: Number,
  frequency: {
    type: String,
    enum: ['per year', 'per month', 'per quarter'],
  },
  situated_floor: Number,
  near_by_places: [String],
  is_available: { type: Boolean, default: true },
  amenities: [String],
  category: { type: schema.Types.ObjectId, ref: 'rentPostCat' },
  sub_category: { type: schema.Types.ObjectId, ref: 'rentPostSubCat' },
  published_on: { type: Date, default: Date.now },
  is_published: { type: Boolean, required: true, default: true },
  is_highlight: { type: Boolean, default: false },
  is_showcase: { type: Boolean, default: false },
  is_active: { type: Boolean, required: true, default: false },
  image: { type: schema.Types.ObjectId, ref: 'file' },
  is_deleted: { type: Boolean, required: true, default: false },
  deleted_at: { type: Date, default: Date.now },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date, default: Date.now },
});

module.exports = RentPost = mongoose.model('rentPost', rentPostSchema);
