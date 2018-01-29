import React, { Component } from 'react'
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';



class MultiSelectField extends Component {
  constructor(props) {
    super(props);
    let value = undefined;
    if (this.props.value) {
      ({value} = this.props);
      value = value.map((seletitem)=>{
        return {label:seletitem.name,value:seletitem.id}
      })
    }
    this.state = {
      value: value
    };
  }
  state = {
    removeSelected: true,
    disabled: false,
    stayOpen: false,
    rtl: false,
  }

  handleSelectChange = (value) =>  {
    this.setState({ value });
    const teamlist = value.split(",")
    this.props.addTeam({team:teamlist, currentPage:0})
  }

  render () {
    const { disabled, stayOpen, value } = this.state;
    const options = this.props.valuelist

    console.log(value,"VALUe")

    return (
      <div className="section">
        <h3 className="section-heading">{this.props.label}</h3>
        <Select
          closeOnSelect={!stayOpen}
          disabled={disabled}
          multi
          onChange={this.handleSelectChange}
          options={options}
          placeholder="Select team"
          removeSelected={this.state.removeSelected}
          rtl={this.state.rtl}
          simpleValue
          value={value}
        />
      </div>
    );
  }
}
export default MultiSelectField