import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Task';
import '../models/Team';
import '../models/Status';

const Task = mongoose.model('Task');
const Team = mongoose.model('Team');
const Status = mongoose.model('Status');

export function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listTasks(filterValue) {
  const { offset, limit, search , searchparams} = filterValue;

  let match;
  let matchs;

  if (searchparams) {
    const searchParamsObject = JSON.parse(searchparams)
    const paramStatus = parseInt(searchParamsObject.status);
    const paramSearch = searchParamsObject.search;

    if (paramStatus) {
      match = {status: paramStatus}
    }
    if (paramSearch) {
      matchs = {$text: {$search: paramSearch}}
    }
  }

  let querycount;
  let query = [
    {
      $lookup:{
        from: "teams",
        localField: "team",
        foreignField: "id", as: "team"
      }
    },
    {
      $lookup:{
        from: "statuses",
        localField: "status",
        foreignField: "value", as: "status"
      }
    }
    ];

  query.unshift({ $sort : { date: -1 } })
  if (match){
    query.unshift({ $match : match })
  }
  if (matchs){
    query.unshift({ $match : matchs })
  }
  querycount = [...query]

  querycount.push({
    $count: "passing_scores"
  })
  query.push(
    {$skip: parseInt(offset)},
    {$limit: parseInt(limit)},
  )
  //
  // query.unshift(
  //   { "$match": { "team": { "$in": team } } },
  //   { "$redact": {
  //       "$cond": [
  //         { "$setIsSubset": [ "$team", team ] },
  //         "$$KEEP",
  //         "$$PRUNE"
  //       ]
  //     }}
  // )
  let tasks = Task.aggregate(query)
  let count = Task.aggregate(querycount)
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
export function updateTask (data) {
    const query ={
      "title": data.title,
      "description": data.description,
      "team": data.team,
      "status": data.status
    }
    return Task.update(
      {_id:data._id},
      {$set:query}
  )

}
export function createTeam(data) {
  const team = new Team({
    name: data.name,
    position: data.position,
    id: data.id,
  });

  return team.save();
}

export function deleteTask(id) {

  return Task.findById(id).remove();
}

export  function listTeam () {
  return Team.find();
}