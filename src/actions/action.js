import api from '../api';
import type from './action_type';

export function addNewTask (task) {
  return{
    type: 'ADD_NEW_TASK',
    task
  }
}
export function showtasks (task) {
  return function (dispatch) {
    api.listTask().then(({ data }) => {
      console.log(data)
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
export function removeTask (id) {
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
      dispatch(showtasks())
      }
    ).catch(err =>
        dispatch({
          type: type.LOAD_TASKS_FAIL,
          error: err
        })
      )
  }
}

export function createTask (task) {
  return function (dispatch) {
    dispatch({
      type: type.ISLOADING,
      isloading: true
    })
    api.createTask(task).then(({ data }) => {
      dispatch(showtasks())
      }
    ).catch(err =>
        dispatch({
          type: type.LOAD_TASKS_FAIL,
          error: err
        })
      )
  }
}
