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
        <td>
          {
            props.status.map((status)=>{
              return(
                <div key={status._id}>{status.label}</div>
              )
            })
          }
        </td>
        <td>{ moment(props.date).format("DD-MM-YYYY HH:mm:ss") } </td>
        <td>Author</td>
        <td>

          {
            props.team.map((team)=>{
              return(
                <div key={team._id}>{team.name}</div>
              )
            })
          }
        </td>
        <td className='actions' colSpan='3'>
          <div className='action-container'>
            <button className='edit' title='Edit Task' onClick={props.editTaskModal}><i className="fi flaticon-list-2"></i></button>
            <button
              className='delete'
              title='Delete Task'
              onClick={props.deleteTask}>
              <i className="fi flaticon-list-3"></i>
            </button>
            <button className='finish' title='Finish Task' onClick={props.finish}><i className="fi flaticon-flag"></i></button>
          </div>
        </td>
    </tr>
)

export default Task