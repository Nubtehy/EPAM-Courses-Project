import api from '../api';
import type from './action_type';

export function addNewTask (task) {
  return{
    type: 'ADD_NEW_TASK',
    task
  }
}
export function showTasks (filterValue) {

  return function (dispatch) {
    dispatch({
      type: type.ISLOADING,
      isloading: true
    })
      api.listTask(filterValue).then(({ data }) => {
          dispatch({
            type: type.ISLOADING,
            isloading: false
          })
          return data
        }
      ).then(
        (data) =>{
          dispatch({
            type: type.LOAD_TASKS_SUCCESS,
            tasks: data
          })
        }
      ).catch(err =>{
          dispatch({
            type: type.LOAD_TASKS_FAIL,
            error: err
          })
        }
      )

  }
}
export function updateTask (task,filterValue) {
  return function (dispatch) {
    dispatch({
      type: type.ISLOADING,
      isloading: true
    })
    api.updateTask(task).then(({ data }) => {

          dispatch({
            type: type.LOAD_UPDATE_SUCCESS,
            isloading: false
          })
          return filterValue
        }
      ).then((filterValue)=>{
        dispatch(showTasks (filterValue))
      }).catch(err =>{
        console.log(err)
        dispatch({
          type: type.LOAD_UPDATE_FAIL,
          error: err
        })
        }
      )

  }
}
export function removeTask (id,filterValues) {
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

