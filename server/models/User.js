const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String },
    tasks: [
      {
        _id: String,
        status: { type: String, enum: ['todo', 'inProgress', 'done'] },
        name: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);
module.exports = model('User', schema);
