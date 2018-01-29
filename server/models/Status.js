import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StatusSchema = new Schema({
  label        : { type: String },
  value     : { type: String }
});

mongoose.model('Status',StatusSchema);
