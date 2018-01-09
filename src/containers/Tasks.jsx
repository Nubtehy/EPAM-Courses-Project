import React,{ Component } from 'react'
import Task from './../components/Task.jsx'
import { connect } from 'react-redux'


class Tasks extends Component{

    render(){
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Created</th>
                            <th>Text</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Author</th>
                            <th>Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tasks.map(task => {

                            return (

                                <Task key={task.id}
                                      {...task}

                                />

                            )
                        })}
                    </tbody>


                </table>
                <button onClick={this.props.addNewTask}></button>
            </div>


        )
    }
}
const mapStateToProps = (state) => {

    return{
        tasks: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        addNewTask:(task) => dispatch({type: "ADD_NEW_TASK",task})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);