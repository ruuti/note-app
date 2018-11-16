import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateNote }  from '../../firebase';
import { Editor as NoteEditor, EditorState, 
  RichUtils, convertToRaw, convertFromRaw} from 'draft-js';

/**
 * Note UI editor to edit active note.
 */
class Editor extends Component {

  constructor(props) {
    super(props);

    const { note } = props;    
    this.state = {
      ...note,
      editorState: this.getEditorStateFromNote(note)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = () => this.refs.editor.focus();
  }


  // Returns either empty EditorState or from
  // raw
  getEditorStateFromNote(note){
    return note.raw
      ? 
        EditorState.createWithContent(
          convertFromRaw(
            JSON.parse(note.raw)
          )
        ) 
      :
        EditorState.createEmpty()
  }

  // Update state when user navigates to 
  // a new note.
  componentWillReceiveProps(nextProps) {
    const { note } = nextProps;
    if (this.state.id !== note.id) {
      this.setState({
        ...note,
        editorState: this.getEditorStateFromNote(
          note
        )
      });
    }
  }

  // Takes current editorState and stores both raw and
  // plaintext values to database
  storeToDatabase(editorState){
    const raw = convertToRaw(
      editorState.getCurrentContent()
    );
    const { id } = this.state;
    let plainText = '';
    raw.blocks.map(block =>
      plainText += block.text+' '
    );
    updateNote(id, plainText, JSON.stringify(raw));
  }

  // Handle editor change when onChange gets
  // triggered
  handleChange(editorState) {
    this.setState({editorState});
    this.storeToDatabase(editorState);
  }

  // Handle commands like cmd+(b|i|u)
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(
      editorState,
      command
    );
    if (newState) {
      this.handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  // Render editor for a note
  render() {
    return (
      <div className="area" onClick={this.focus}>
        <NoteEditor 
          editorState={this.state.editorState} 
          onChange={this.handleChange}
          spellCheck={true}
          ref="editor"
          handleKeyCommand={this.handleKeyCommand} />
      </div>
    );
  }
}

export default connect()(Editor);