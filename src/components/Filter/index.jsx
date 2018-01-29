import React, { Component } from 'react'
import SelectItem from '../Select.jsx';
import 'react-select/dist/react-select.css';
import './styles.scss';
import MultiSelectField from '../MultySelect.jsx'

const Filter = (props) =>{

  let listForMultySelect = props.team.teamlist.map((list)=>{
    return { label: list.name, value: list.id };
  })

  return <div className='slideDown'>
        <form>
          <div className='form-row'>
            <div className='form-row-item'>
              <SelectItem valuelist={props.status} label={'Select status'} Status={props.setFilterParams}/>
            </div>
            <div className='form-row-item'>
              <MultiSelectField valuelist={listForMultySelect} label={'Select team members'} addTeam = { props.setFilterParams}/>
            </div>
          </div>
        </form>
  </div>
}

export default Filter