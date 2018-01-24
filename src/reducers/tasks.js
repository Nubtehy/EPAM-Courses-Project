import type from '../actions/action_type';
const defaultitems = {
  taskslist: null,
  loadtaskfail: false,
  isloading: true
};

export default function (state = defaultitems, action ) {
  switch (action.type) {
    case type.LOAD_TASKS_SUCCESS:
      return Object.assign ({},state,
        {
          taskslist:action.tasks,
        },
        {
          loadtaskfail: false
        },
        {
          isloading: action.isloading
        }
        )
    case type.LOAD_TASKS_FAIL:
      return Object.assign ({},state,{loadtaskfail:true})

    case type.ISLOADING:

      return Object.assign ({},state,{isloading:action.isloading})

    default:
      return state
  }

  return state
}


