const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rentViewCountSchema = new schema({
  rent_post_id: { type: schema.Types.ObjectId, ref: 'rent' },
  date: { type: Date },
  count: { type: Number },
});

module.exports = rent = mongoose.model('rentPostViewCount', rentViewCountSchema);
