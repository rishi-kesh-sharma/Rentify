const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rentPostViewCountSchema = new schema({
  rent_post_id: { type: schema.Types.ObjectId, ref: 'rentPost' },
  date: { type: Date },
  count: { type: Number },
});

module.exports = RentPost = mongoose.model('rentPostViewCount', rentPostViewCountSchema);
