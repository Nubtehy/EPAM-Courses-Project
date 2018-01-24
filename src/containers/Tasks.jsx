import React,{ Component } from 'react';
import Task from './../components/Task.jsx';
import { connect } from 'react-redux';

import TaskPage from '../components/TaskPage.jsx';
import Modal from '../components/Modal/index.jsx';
import { createTask, showtasks, removeTask } from './../actions/action.js';

class Tasks extends Component{
  constructor(props) {
    super(props);
    this.state = {
      setEdit: false,
      setAdd: false,
      item: null
    };
    this.deleteTaskFromList = this.deleteTaskFromList.bind(this)
  }
    componentDidMount(){
        this.props.getTasks();
    }
    addNewTask=()=>{
      this.setState({ setAdd: true })
    }
    submitTask = (newtask) => {
      this.props.addTask(newtask);
    }
    deleteTaskFromList (e) {
      const id = e._id
      this.props.removeTask(id);
    }
    hideEditor = () => {
      this.setState({ setAdd: false })
    }
    render(){
      const taskslist = this.props.tasks;
      return(
          <div>
              <table>
                  <thead>
                      <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Progress</th>
                          <th>Author</th>
                          <th>Team</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      taskslist?
                        taskslist.map((task,i) => {
                          return (
                            <Task key={ task._id }
                                  number = {i}
                                  {...task}
                                  deleteTask = { this.deleteTaskFromList.bind(null, task)}
                            />
                          )
                        })
                      :
                        <tr><td>No results</td></tr>
                    }
                  </tbody>


              </table>
            {
              (this.state.setAdd || this.state.setEdit)
                ?
                <Modal title='Create New Task' hideEditor = { this.hideEditor }>
                  <TaskPage submitTask = {this.submitTask} hideEditor = { this.hideEditor }  />
                </Modal>
                :
                ""
            }
              <button onClick={this.addNewTask}>Add Task</button>
          </div>


      )
    }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.taskslist
  };
};
const mapDispatchToProps = (dispatch) => {

  return {
    tasksfilter: (filterValues) => dispatch(MessagesList(filterValues)),
    getTasks: (filterValues) => dispatch(showtasks(filterValues)),
    addTask: (addTask) => dispatch(createTask(addTask)),
    removeTask: (removeTaskID) => dispatch(removeTask(removeTaskID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
