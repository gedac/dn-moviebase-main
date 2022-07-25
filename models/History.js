import mongoose from 'mongoose';

global.models = global.models || {};

global.models.History =
  global.models.History ||
  mongoose.model('History', {
    id: { type: Number, required: true, unique: true},
    title: { type: String, required: true, unique: true},
    posterPath: { type: String, required: true, unique: true},
  });

export default global.models.History;
