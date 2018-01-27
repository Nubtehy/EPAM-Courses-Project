import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Task';

const Task = mongoose.model('Task');

export function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listTasks(filterValue) {
  const { offset, limit } = filterValue;
  let tasks = Task.aggregate([
    {
      $group: {
        _id: '$_id',
      }
    },
    {$skip: parseInt(offset)},
    {$limit: parseInt(limit)},
  ])
  let count = Task.count();
  return Promise.all([tasks, count]).then(values => {
    return new Promise((resolve, reject) => {
      resolve({
        tasks: values[0],
        count: values[1],
      })
    })
  })
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
    status: data.status,
  });

  return task.save();
}

export function deleteTask(id) {
  return Task.findById(id).remove();
}

