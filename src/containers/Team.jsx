import React, {Component} from 'react'
import { connect } from 'react-redux'
import { showTeam } from '../actions/team'
import TeamItem from '../components/Team/index.jsx'

class Team extends Component{
  constructor (){
    super();
    this.state={
      list: null,
    }
  }
  componentDidMount(){
    this.props.getTeam()
  }
  render(){
    return(
      <div className='t-block'>
        <div className='t-block-head'>
          <div className='t-block-left'>
            <h1>Team page</h1>
          </div>
        </div>
        <div>
          {
            this.props.team?
                this.props.team.map((team)=>{
                  return  <TeamItem key={team._id} {...team}/>
                })
              :
                ""
          }


        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    team: state.team.teamlist
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getTeam: () => dispatch(showTeam())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Team)
