import { createStore } from 'redux'
import tasksReducer from './../reducers/tasks'

const taskStore = createStore(
    tasksReducer
)


export default taskStore