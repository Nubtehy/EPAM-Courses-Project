import api from '../api';
import type from './action_type';

export function addNewTask (task) {
  return{
    type: 'ADD_NEW_TASK',
    task
  }
}
export function showTasks (filterValue) {
  console.log(filterValue,'filterValue')
  return function (dispatch) {
    api.listTask(filterValue).then(({ data }) => {
      dispatch({
        type: type.LOAD_TASKS_SUCCESS,
        tasks: data
      })
      }
    ).catch(err =>
        dispatch({
          type: type.LOAD_TASKS_FAIL,
          error: err
        })
      )
  }
}
export function singleTask (id) {
  return function (dispatch) {
    dispatch({
      type: type.ISLOADING,
      isloading: true
    })
    api.singleTask(id).then(({ data }) => {
      dispatch({
        type: type.LOAD_TASK_SUCCESS,
        task: data,
        isloading: false
      })
      }
    ).catch(err =>
        dispatch({
          type: type.LOAD_TASKS_FAIL,
          error: err
        })
      )
  }
}
export function removeTask (id,filterValues) {
  console.log(filterValues, 'remove')
  return function (dispatch) {
    dispatch({
      type: type.ISLOADING,
      isloading: true
    })
    api.deleteTask(id).then(({ data }) => {
      dispatch({
        type: type.LOAD_TASK_SUCCESS,
        task: data,
        isloading: false
      })
      dispatch(showTasks(filterValues))
      }
    ).catch(err =>
        dispatch({
          type: type.LOAD_TASKS_FAIL,
          error: err
        })
      )
  }
}

export function createTask (task,filterValues) {
  console.log(filterValues)
  return function (dispatch) {
    dispatch({
      type: type.ISLOADING,
      isloading: true
    })
    api.createTask(task).then(({ data }) => {
      dispatch(showTasks(filterValues))
      }
    ).catch(err =>
        dispatch({
          type: type.LOAD_TASKS_FAIL,
          error: err
        })
      )
  }
}
export function  updateTaskFilter (filterValue) {
  return function (dispatch) {
    dispatch({
      type:type.ISLOADING,
      isloading: true
    })
    dispatch({
      type: type.UPDATETASKFILTER,
      filter: filterValue
    })
  }

}