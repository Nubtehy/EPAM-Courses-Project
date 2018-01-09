const tasksState = [
    {
        id: 1,
        title: 'Find some problem',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        date: '21.07',
        status: 'new',
        progress: 1
    }, {
        id:2,
        title: 'Create new status for messages',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        date: '21.08',
        status: 'in-progress',
        progress: 1
    }, {
        id: 3,
        title: 'To buy a new bag',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        date: '21.11',
        status: 'in-progress',
        progress: 18
    }, {
        id: 4,
        title: 'To create something amazing',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        date: '21.12',
        status: 'in-progress',
        progress: 17
    }, {
        id: 5,
        title: 'To create something amazing or not',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        date: '21.07',
        status: 'new',
        progress: 12
    }, {
        id: 6,
        title: 'To create something amazing for me',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        date: '21.07',
        status: 'finished',
        progress: 2
    }, {
        id: 7,
        title: 'To fix a bag',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        date: '21.07',
        status: 'finished',
        progress: 2
    }, {
        id: '8',
        title: 'To drink some coffe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        date: '21.07',
        status: 'new',
        progress: 44
    }
]


const taskReduser = (state = tasksState, action ) =>{
    if (action.type === 'ADD_NEW_TASK'){
        return state.concat(action.task)
    }
    return state
}
export default taskReduser