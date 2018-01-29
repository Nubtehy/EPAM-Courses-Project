import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    id        : { type: Number },
    title     : { type: String },
    date      : { type: Date },
    description: {type: String},
    team: {type: Array},
    status: {type: Number}
});

mongoose.model('Task', TaskSchema);
