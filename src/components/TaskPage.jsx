import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
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
    this.state = {
      editorState: EditorState.createEmpty(),
      title: '',
      team: '',
      status: 2
    };
    this.Additem.bind(this)
  }
  state = {
    selectedOption: '',
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  Additem = (editorState) => {
    const taskitem = {
      title: this.state.title,
      description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      team: this.state.team,
      status: this.state.status
    }
    this.props.submitTask(taskitem);
    this.props.hideEditor();

  }
  addTeam = (team) =>{
    this.setState({
      team: team
    });
  }
  addStatus = (status) =>{
    this.setState({
      status: status
    });
  }
  handleChangeTitle=(event)=> {
    this.setState({title: event.target.value})
  }
  render() {

    const { editorState } = this.state;
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    return (
      <div>
        <input type='text' className='form-input' value={this.state.title} onChange={this.handleChangeTitle} placeholder='Add task title'/>
      <SelectItem Status={this.addStatus} />
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
        <MultySelect addTeam = { this.addTeam }/>
        <button className='button' onClick={this.Additem}>Save</button>
      </div>
    )
  }
}

export default TaskPage