const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rentSchema = new schema({
  title: { type: String },
  description: { type: String },
  highlights: { type: schema.Types.Mixed },
  furnish_status: String,
  community_features: { type: schema.Types.Array },
  furnished_items: { type: schema.Types.Array },
  rooms: { type: schema.Types.Array },
  posted_by: { type: schema.Types.ObjectId, ref: 'users' },
  likes: { type: [schema.Types.ObjectId], ref: 'users' },
  saves: { type: [schema.Types.ObjectId], ref: 'users' },
  location: { province: String, district: String, municipality: String },
  price_on_call: { type: Boolean, default: false },
  price: Number,
  situated_floor: Number,
  no_of_floors: Number,
  amenities: schema.Types.Mixed,
  category: { type: schema.Types.ObjectId, ref: 'rentPostCat' },
  sub_category: { type: schema.Types.ObjectId, ref: 'rentPostSubCat' },
  published_on: { type: Date, default: Date.now },
  is_published: { type: Boolean, required: true, default: true },
  is_highlight: { type: Boolean, default: false },
  is_showcase: { type: Boolean, default: false },
  is_active: { type: Boolean, required: true, default: true },
  image: { type: String },
  is_deleted: { type: Boolean, required: true, default: false },
  deleted_at: { type: Date, default: Date.now },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date, default: Date.now },
});
module.exports = rent = mongoose.model('rentPost', rentSchema);
