const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reservationClaimSchema = new schema({
  claimed_by: { type: schema.Types.ObjectId, ref: 'users' },
  claimed_to: { type: schema.Types.ObjectId, ref: 'rentPost' },
  status: { type: String, default: 'pending', enums: ['accepted', 'rejected', 'pending'] },
  is_deleted: { type: Boolean, default: false },
  is_active: { type: Boolean, required: true, default: true },
  deleted_at: { type: Date, default: Date.now },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date, default: Date.now },
});

module.exports = rent = mongoose.model('reservationClaim', reservationClaimSchema);

reservationClaimSchema.post('save', function (next) {
  console.log(this);
  if (this.isModified('status')) {
    console.log(this);
  }
  next();
});
