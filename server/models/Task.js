import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    id        : { type: Number },
    title     : { type: String },
    date      : { type: Date },
    description: {type: String},
    team: {type: String},
    status: {type: String}
});

mongoose.model('Task', TaskSchema);
