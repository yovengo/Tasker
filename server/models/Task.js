const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: String,
    description: String,
    status: { type: String, enum: ['todo', 'inProgress', 'done'] },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: 'created_at' } }
);

module.exports = model('Task', schema);
