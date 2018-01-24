import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { singleTask } from '../actions/action'
import './styles.scss';


class TaskPage extends Component{
  componentDidMount(){
    this.props.singleTask(this.props.match.params.id);
  }
    render(){
        const isloading = this.props.isloading;
        const loadtaskfail = this.props.loadtaskfail;
        return(
            <div>
              {
                loadtaskfail?
                  <div>Request error</div>
                  :
                  (isloading?
                    <div className='loader'>
                    </div>
                    :
                    <div>
                      { this.props.task.title }
                    </div>)


              }

            </div>
        )
    }
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    task: state.task.task,
    isloading: state.task.isloading,
    loadtaskfail: state.task.loadtaskfail
  };
};
const mapDispatchToProps = (dispatch) => {

  return {
    tasksfilter: (filterValues) => dispatch(MessagesList(filterValues)),
    singleTask: (id) => dispatch(singleTask(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
