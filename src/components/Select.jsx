import React, { Component } from 'react'
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const Status = [
  { label: 'Canceled', value: '1' },
  { label: 'To Do', value: '2' },
  { label: 'In Progress', value: '3' },
  { label: 'Ready For QA', value: '4' },
  { label: 'QA', value: '5' },
  { label: 'Done', value: '6' },
];

const WHY_WOULD_YOU = [
  { label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(Status.slice(1));

class SelectField extends Component {
  state = {
    removeSelected: true,
    disabled: false,
    crazy: false,
    stayOpen: false,
    value: [],
    rtl: false,
  }

  handleSelectChange = (value) =>  {
    this.setState({ value });
    this.props.Status(value)
  }

  render () {
    const { crazy, disabled, stayOpen, value } = this.state;
    const options = crazy ? WHY_WOULD_YOU : Status;
    return (
      <div className="section">
        <h3 className="section-heading">{this.props.label}</h3>
        <Select
          closeOnSelect={!stayOpen}
          disabled={disabled}
          onChange={this.handleSelectChange}
          options={options}
          placeholder="Select task status"
          removeSelected={this.state.removeSelected}
          rtl={this.state.rtl}
          simpleValue
          value={value}
        />
      </div>
    );
  }
}
export default SelectField