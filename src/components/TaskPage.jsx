import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState,convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import MultySelect from '../components/MultySelect.jsx';
import SelectItem from '../components/Select.jsx';


class TaskPage extends Component {
  constructor(props) {
    super(props);
    let _id = null,
      title = '',
      description = '',
      status = '',
      team = [],
      valueTeamForMultySelect=[],
      teamlist=[],
      statuslist=[];

    let contentState = ContentState.createFromText('');
    if (this.props.edittask) {
      ({title, description, status, team, _id} = this.props.edittask)
      valueTeamForMultySelect = [...team];
      team.map((seletitem)=>{
        return teamlist.unshift(seletitem.id)
      })

      status.map((seletitem)=>{
        return statuslist = seletitem.value;
      })

    }
    if (description){
      const contentBlock = htmlToDraft(description);

      if (contentBlock) {
        contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      }
    }
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      _id: _id,
      editorState,
      title: title,
      team: teamlist,
      statuslist: statuslist,
      status: status,
      valueTeamForMultySelect: valueTeamForMultySelect
    };
    this.addItem.bind(this);
    this.editItem.bind(this)
  }
  state = {
    selectedOption: '',
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  createContentStateWithBody = templateBody => {
    const clearTemplate = htmlToDraft(convertFromRaw(templateBody));
    return clearTemplate;
  };
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  addItem = (editorState) => {
    const taskitem = {
      title: this.state.title,
      description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      team: this.state.team,
      status: this.state.statuslist
    }
    this.props.submitTask(taskitem);
    this.props.hideEditor();

  }
  editItem = (editorState) => {
    const taskitem = {
      _id: this.state._id,
      title: this.state.title,
      description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      team: this.state.team,
      status: this.state.statuslist
    }
    console.log(taskitem,"EDIT")
    this.props.editTaskSend(taskitem);
    this.props.hideEditor();

  }
  addTeam = (team) =>{

    this.setState({
      team: team.team
    });
  }
  addStatus = (status) =>{

    this.setState({
      statuslist: status.status
    });
  }
  handleChangeTitle=(event)=> {
    this.setState({title: event.target.value})
  }
  render() {

    const { editorState, team, status, valueTeamForMultySelect } = this.state;

    let listForMultySelect = this.props.team.teamlist.map((list)=>{
      return { label: list.name, value: list.id };
    })
    return (
      <div>
        <input type='text' className='form-input' value={this.state.title} onChange={this.handleChangeTitle} placeholder='Add task title'/>
        {console.log(this.state)}
      <SelectItem Status={this.addStatus} valuelist={this.props.status} value={this.state.status}/>
      <Editor
        editorState={editorState}
        onChange={ html => this.setState({ content: html }) }
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />

        <MultySelect addTeam = { this.addTeam } valuelist = {listForMultySelect} value={valueTeamForMultySelect}/>
        <button className='button' onClick={!this.props.edittask? this.addItem : this.editItem}>Save</button>
      </div>
    )
  }
}

export default TaskPage