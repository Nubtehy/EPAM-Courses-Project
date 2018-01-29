import React, { Component } from 'react'
import Task from './../components/Task.jsx'
import { connect } from 'react-redux'

import TaskPage from '../components/TaskPage.jsx';
import Modal from '../components/Modal/index.jsx';
import Filter from '../components/Filter/index.jsx';
import Search from '../components/Search/index.jsx';

import ReactPaginate from 'react-paginate';
import Status from './status.json';

import { createTask, showTasks, removeTask, updateTaskFilter, updateTask } from './../actions/action.js'
import { showTeam } from './../actions/team.js'

class Tasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      setEdit: false,
      setAdd: false,
      editItem: null,
      showFilter: false,
      showSearch: false,
    }
    this.deleteTaskFromList = this.deleteTaskFromList.bind(this)
  }

  componentDidMount () {
    this.getTaskList();
    this.props.getTeam();
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

    const { status, search, dateend, datestart} = this.props.filter

    const offset = itemsPerPage * currentPage;
    const filterValues = {
      offset: offset,
      limit: itemsPerPage,
      filter:{
        status,
        search,
        dateend,
        datestart
      }
    };
    setTimeout(function () {

      loading: true
    },2000)
    this.props.getTasks(filterValues)
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

  editTaskSend =(newtask) =>{
    const { itemsPerPage } = this.props.filter;
    const { currentPage } = this.props.filter

    const offset = itemsPerPage * currentPage;
    const filterValues = {
      offset: offset,
      limit: itemsPerPage,
    };
    this.props.editTask(newtask,filterValues)

  }
  showFilter = () => {
    this.setState((prevState) => {
      return {showFilter: !prevState.showFilter};
    });
  }
  showSearch = () => {
    this.setState((prevState) => {
      return {showSearch: !prevState.showSearch};
    });
  }

  addNewTask = () => {
    this.setState({setAdd: true})
  }
  hideEditor = () => {
    this.setState({
      setAdd: false,
      setEdit: false,
      editItem: null,
    })
  }
  editTaskModal =(task) =>{
    this.setState({setEdit: true, editItem: task})
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
  sendSearch = (params) =>{
    const { itemsPerPage } = this.props.filter;
    let { currentPage } = this.props.filter
    const {status, dataend, datastart } = this.props.filter
    const {search} = params;

    if (params.currentPage == 0){
      currentPage = params.currentPage
    }
    const filterValues ={
      currentPage: currentPage,
      limit: itemsPerPage,
      status, dataend, datastart, search
    }
    this.props.tasksFilter(filterValues)
  }
  setFilterParams = (params) =>{

    const { itemsPerPage } = this.props.filter;
    let { currentPage } = this.props.filter
    const {status, dataend, datastart} = params;
    let search;
    if (params.currentPage == 0){
      currentPage = params.currentPage
    }
    if (this.props.filter.search){
      search = this.props.filter.search
    } else{

      search = params.search
    }
    const filterValues ={
      currentPage: currentPage,
      limit: itemsPerPage,
      status, dataend, datastart, search
    }
    this.props.tasksFilter(filterValues)

  }
  render () {
    const {itemsPerPage, total, currentPage } = this.props.filter;
    const isLoading = this.props.isLoading;
    const taskslist = this.props.tasks;
    const totalpage = total/itemsPerPage;
    const offset = itemsPerPage*currentPage;
    const totalItems  = taskslist? taskslist.length : total;
    return (
      <div className='t-block'>
        <div className='t-block-head flex-container'>
          <div className='t-block-left'>
            <h1>Tasks page</h1>
          </div>
          <div>
            {
              this.state.showSearch ?
                <Search value='' sendSearch={this.sendSearch}></Search>
                :
                ''
            }
          </div>
          <div className='t-block-right'>
            <button className='button' onClick={this.addNewTask}>Add Task</button>
            <button className='filter' onClick={this.showFilter}><i className='fi flaticon-tool'></i></button>
            <button className='filter' onClick={this.showSearch}><i className='fi flaticon-search'></i></button>
          </div>
        </div>
        {
          this.state.showFilter ?
            <Filter status = {Status} setFilterParams={this.setFilterParams}></Filter>
            :
            ''
        }
          {
            isLoading ?
              <div className='loader'>
              </div>
              :
              <table className='t-block-table'>
                <thead>
                <tr>
                  <th colSpan='2'>Title</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Author</th>
                  <th colSpan='2'>Team</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {console.log(taskslist)}
                {
                  taskslist && total ? taskslist.map((task, i) => {
                      return (
                        <Task key={task._id}
                              number={i + offset}
                              {...task}
                              deleteTask={this.deleteTaskFromList.bind(null, task)}
                              editTaskModal={this.editTaskModal.bind(null, task)}
                        />
                      )
                    })
                    : <tr>
                      <td>No results</td>
                    </tr>
                }

                </tbody>


              </table>
          }

        {
          (this.state.setAdd || this.state.setEdit)
            ? <Modal title='Create New Task' hideEditor={this.hideEditor}>
              <TaskPage
                submitTask={this.submitTask}
                hideEditor={this.hideEditor}
                status={Status}
                team = {this.props.team}
                edittask={this.state.editItem}
                editTaskSend={this.editTaskSend}
              />
            </Modal>
            : ''
        }
        {
          total > itemsPerPage && (totalItems >=1)?
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
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    tasks: state.tasks.taskslist,
    total: state.tasks.count,
    filter: state.tasks.filter,
    searchparams: state.tasks.filter.searchparams,
    team: state.team,
    isLoading: state.tasks.isloading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    tasksFilter: (filterValues) => dispatch(updateTaskFilter(filterValues)),
    getTasks: (filterValues) => dispatch(showTasks(filterValues)),
    addTask: (addTask,filterValues) => dispatch(createTask(addTask,filterValues)),
    removeTask: (removeTaskID,filterValues) => dispatch(removeTask(removeTaskID,filterValues)),
    editTask: (updatedTask,filterValues) => dispatch(updateTask(updatedTask,filterValues)),
    getTeam: () => dispatch(showTeam())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
