import React, { Component } from 'react'
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ContentState, EditorState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'


class SelectField extends Component {
  constructor(props) {
    super(props);
    let value =undefined;

    if (this.props.value) {
      ({value} = this.props);
      value = value.map((seletitem)=>{
        return {label:seletitem.label,value:seletitem.value}
      })
      value = value[0];
    }
    this.state = {
      value: value
    };
  }
  state = {
    removeSelected: false,
    crazy: false,
    stayOpen: false,
  }

  handleSelectChange = (value) =>  {
    this.setState({ value });
    this.props.Status({status:value, currentPage:0})
  }

  render () {
    const {disabled, stayOpen, value } = this.state;
    const options = this.props.valuelist;

    return (
      <div className="section">
        <h3 className="section-heading">{this.props.label}</h3>
        <Select
          closeOnSelect={!stayOpen}
          onChange={this.handleSelectChange}
          options={options}
          placeholder="Select task status"
          removeSelected={this.state.removeSelected}
          simpleValue
          value={value}


        />
      </div>
    );
  }
}
export default SelectField