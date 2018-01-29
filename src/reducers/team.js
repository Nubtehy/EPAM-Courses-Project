import type from '../actions/action_type'
const defaultitems = {
  teamlist: null,
  loadTeamFail: false,
  isLoading: true
};
export default function (state = defaultitems, action ) {
  switch (action.type) {
    case type.LOAD_TEAM_SUCCESS:
      return {
        ...state,
        teamlist: action.team,
        loadTeamFail: false,
        isLoading: action.isloading,
      }
    case type.LOAD_TASKS_FAIL:
      return {
        ...state,
        loadTeamFail:true
      }
    case type.ISLOADING:

      return {...state,isLoading:action.isloading}
    default:
      return state
  }

  return state
}
