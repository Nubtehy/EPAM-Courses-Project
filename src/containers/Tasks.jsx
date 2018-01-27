import React, { Component } from 'react'
import Task from './../components/Task.jsx'
import { connect } from 'react-redux'

import TaskPage from '../components/TaskPage.jsx';
import Modal from '../components/Modal/index.jsx';
import ReactPaginate from 'react-paginate';

import { createTask, showTasks, removeTask, updateTaskFilter } from './../actions/action.js'

class Tasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      setEdit: false,
      setAdd: false,
      item: null,
    }
    this.deleteTaskFromList = this.deleteTaskFromList.bind(this)
  }

  componentDidMount () {
    this.getTaskList();
  }
  componentDidUpdate(prevProps){
    const { id } = this.props.filter;
    if (id != null && id !== prevProps.filter.id) {
      this.getTaskList();
    }
  }
  getTaskList = () =>{
    const { itemsPerPage } = this.props.filter;
    const { currentPage } = this.props.filter

    const offset = itemsPerPage * currentPage;
    const filterValues = {
      offset: offset,
      limit: itemsPerPage,
    };
    this.props.getTasks(filterValues)
  }
  addNewTask = () => {
    this.setState({setAdd: true})
  }
  submitTask = (newtask) => {
    const { itemsPerPage } = this.props.filter;
    const { currentPage } = this.props.filter

    const offset = itemsPerPage * currentPage;
    const filterValues = {
      offset: offset,
      limit: itemsPerPage,
    };
    this.props.addTask(newtask,filterValues)
  }

  deleteTaskFromList (e) {

    const { itemsPerPage } = this.props.filter;
    const { currentPage } = this.props.filter

    const offset = itemsPerPage * currentPage;

    let offsetForFilter = offset;

    if (this.props.tasks.length === 1 && offset !== 0){
      offsetForFilter = offset - itemsPerPage;
      const setData = {selected : offsetForFilter};
      this.handlePageClick(setData)
    }
    const filterValues = {
      offset: offsetForFilter,
      limit: itemsPerPage,
    };
    const id = e._id
    this.props.removeTask(id,filterValues)
  }

  hideEditor = () => {
    this.setState({setAdd: false})
  }
  handlePageClick = (data) => {
    const { itemsPerPage } = this.props.filter;
    const { currentPage } = this.props.filter

    if (currentPage != data.selected){
      const currentPage = data.selected;
      const filterValues ={
        currentPage: currentPage,
        limit: itemsPerPage,
      }
      this.props.tasksFilter(filterValues)
    }
  }
  render () {
    const {itemsPerPage, total, currentPage } = this.props.filter;
    const taskslist = this.props.tasks;
    const totalpage = total/itemsPerPage;
    const offset = itemsPerPage*currentPage;
    return (
      <div className='t-block'>
        <div className='t-block-head'>

          <h1>Tasks page</h1>
        </div>
        <table className='t-block-table'>
          <thead>
          <tr>
            <th colSpan='2'>Title</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Author</th>
            <th colSpan='2'>Team</th>
          </tr>
          </thead>
          <tbody>
          {
            taskslist ? taskslist.map((task, i) => {
                return (
                  <Task key={task._id}
                        number={i + offset}
                        {...task}
                        deleteTask={this.deleteTaskFromList.bind(null, task)}
                  />
                )
              })
              : <tr>
                <td>No results</td>
              </tr>
          }
          </tbody>


        </table>
        {
          (this.state.setAdd || this.state.setEdit)
            ? <Modal title='Create New Task' hideEditor={this.hideEditor}>
              <TaskPage submitTask={this.submitTask} hideEditor={this.hideEditor}/>
            </Modal>
            : ''
        }
        {
          total > itemsPerPage ?
            <ReactPaginate previousLabel={<i className='fi flaticon-arrows-2'></i>}
                           nextLabel={<i className='fi flaticon-arrows'></i>}
                           breakLabel={<a href="">...</a>}
                           breakClassName={"break-me"}
                           pageCount={ totalpage }
                           marginPagesDisplayed={1}
                           pageRangeDisplayed={5}
                           onPageChange={this.handlePageClick}
                           containerClassName={"pagination"}
                           subContainerClassName={"pages pagination"}
                           activeClassName={"active"} />
            :
            ''
        }


        <button className='button' onClick={this.addNewTask}>Add Task</button>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.taskslist,
    total: state.tasks.count,
    filter: state.tasks.filter
  }
}
const mapDispatchToProps = (dispatch) => {

  return {
    tasksFilter: (filterValues) => dispatch(updateTaskFilter(filterValues)),
    getTasks: (filterValues) => dispatch(showTasks(filterValues)),
    addTask: (addTask,filterValues) => dispatch(createTask(addTask,filterValues)),
    removeTask: (removeTaskID,filterValues) => dispatch(removeTask(removeTaskID,filterValues))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
