import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils';
// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers

app.get('/tasks', (req, res) => {
  db.listTasks(req.query).then(data => res.send(data));
});

app.get('/team', (req, res) => {
  db.listTeam(req.query).then(data => res.send(data));
});

app.post('/tasks', (req, res) => {
  db.createTask(req.body).then(data => res.send(data));
});

app.post('/tasks/update', (req, res) => {
  db.updateTask(req.body).then(data => {
    if (data){
      res.send(data)
    } else{
      res.status(404).send({error:"0_o"})
    }

  });
});
app.delete('/tasks/:id', (req, res) => {
  db.deleteTask(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, function() {
  console.log(`Server is up and running on port ${serverPort}`);
});
