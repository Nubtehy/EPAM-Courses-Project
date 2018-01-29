import type from './action_type'
import api from '../api'

export function showTeam () {
  return function (dispatch) {
    api.listTeam().then(({ data }) => {
        dispatch({
          type: type.LOAD_TEAM_SUCCESS,
          team: data
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