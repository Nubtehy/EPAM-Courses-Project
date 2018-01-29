import type from '../actions/action_type';
const defaultitems = {
  taskslist: null,
  total: null,
  loadtaskfail: false,
  isloading: true,
  filter: {
    total: null,
    itemsPerPage: 5,
    currentPage: 0,
    serch: null,
    status: null,
    search: null,
    team: null,
    datestart: null,
    dateend: null
  }
};

export default function (state = defaultitems, action ) {
  switch (action.type) {
    case type.LOAD_TASKS_SUCCESS:
      return {
        ...state,
        taskslist: action.tasks.tasks,
        loadtaskfail: false,
        isloading: false,
        ...{
          filter: {
            ...state.filter,
            total: action.tasks.count.length? action.tasks.count[0].passing_scores:0,
          }
        }
      }
    case type.LOAD_UPDATE_SUCCESS:
      console.log(action,'ACTIOn')
      return {
        ...state,
        isloading: action.isloading,
        ...{
          filter: {
            ...state.filter
          }
        }
      }
    case type.LOAD_TASKS_FAIL:
      return Object.assign ({},state,{loadtaskfail:true})

    case type.ISLOADING:

      return {
      ...state,
      isloading: action.isloading,
      ...{
        filter: {
          ...state.filter
        }
      }
    }
    case type.UPDATETASKFILTER: {
      return {
        ...state,
        ...{
          filter: {
            ...state.filter,
            ...action.data,
            id: Math.random(),
            currentPage: action.filter.currentPage != null
              ? action.filter.currentPage : 0,
            ...action.filter
          },
        }
      };
    }
    default:
      return state
  }

  return state
}


