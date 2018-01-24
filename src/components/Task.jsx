import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const Task = (props) => (
    <tr>
      <td>{props.number+1}</td>
        <td>
          <a className="title">{props.title}</a>
        </td>
        <td>Status</td>
        <td>{ moment(props.date).format("DD-MM-YYYY HH:mm:ss") } </td>
        <td>Author</td>
        <td>Team</td>
        <td><button><i className="fi flaticon-list-2"></i></button></td>
        <td><button onClick={props.deleteTask}><i className="fi flaticon-list-3"></i></button></td>
        <td><button onClick={props.finish}><i className="fi flaticon-flag"></i></button></td>
    </tr>
)

export default Task