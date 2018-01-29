import React, { Component } from 'react'
import _ from 'lodash'
import './styles.scss';

class Search extends Component {
  state = {
    value: '',
  }
  handleChange = (e) =>  {

    this.setState({ value: e.target.value });
    this.lateSubmit(e.target.value);
  }
  submit =(value)=> {
    this.props.sendSearch({search:value, currentPage:0})
  }

  lateSubmit = _.debounce((value) => {
    this.submit(value);
  }, 500);
  render(){
    return (
      <div className='slideDown search'>
        <form>
          <div className='search-row'>
            <div className='search-row-item'>
              <input type='text' placeholder='Search' className='form-row-input' onChange={this.handleChange} value={this.state.value}/>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default Search