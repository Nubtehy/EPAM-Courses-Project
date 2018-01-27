import type from '../actions/action_type';
const defaultitems = {
  taskslist: null,
  total: null,
  loadtaskfail: false,
  isloading: true,
  filter: {
    total: null,
    itemsPerPage: 10,
    currentPage: 0,
    serch: null
  }
};

export default function (state = defaultitems, action ) {
  console.log(state)
  switch (action.type) {
    case type.LOAD_TASKS_SUCCESS:
      return {
        ...state,
        taskslist: action.tasks.tasks,
        loadtaskfail: false,
        isloading: action.isloading,
        ...{
          filter: {
            ...state.filter,
            total: action.tasks.count
          }
        }
      }
    case type.LOAD_TASKS_FAIL:
      return Object.assign ({},state,{loadtaskfail:true})

    case type.ISLOADING:

      return Object.assign ({},state,{isloading:action.isloading})
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
          },
        }
      };
    }
    default:
      return state
  }

  return state
}


