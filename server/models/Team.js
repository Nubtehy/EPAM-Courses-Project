import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  id        : { type: Number },
  name     : { type: String },
  position      : { type: String },
  avatar      : { type: String }
});

mongoose.model('Team', TeamSchema);
