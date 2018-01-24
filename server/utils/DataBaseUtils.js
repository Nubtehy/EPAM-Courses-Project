import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Task';

const Task = mongoose.model('Task');

export function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listTasks(id) {

  return Task.find().sort( { date: 1 } );
}
export function singleTask(id) {
  return Task.findOne({id:id});
}

export function createTask(data) {
  const task = new Task({
    title: data.title,
    description: data.description,
    date: Date.now(),
    team: data.team,
  });

  return task.save();
}

export function deleteTask(id) {
  return Task.findById(id).remove();
}

