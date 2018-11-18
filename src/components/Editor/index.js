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

    this.state = {
      ...props.note,
      editorState: this.getEditorStateFromNote(props.note)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = () => this.refs.editor.focus();
  }

  /**
   * Returns either empty EditorState or from note
   * @param  {object}       note
   * @return {EditorState}
   */
  getEditorStateFromNote(note){
    return note.raw
      ? EditorState.createWithContent(
          convertFromRaw(
            JSON.parse(note.raw)
          )
        ) 
      : EditorState.createEmpty()
  }

  /**
   * Update state when user navigates to a new note.
   * @param  {object} props.note
   */
  componentWillReceiveProps({note}) {
    if (this.state.id !== note.id) {
      this.setState({
        ...note,
        editorState: this.getEditorStateFromNote(
          note
        )
      });
    }
  }

  /**
   * Gets the plain text version (one string) from
   * raw data. Line breaks (blocks) are replaced
   * with space.
   * @param  {RawDraftContentState} options.blocks
   * @return {string} plaintext
   */
  getPlainTextVersion({blocks}){
    let plainText = '';
    blocks.map(block =>
      plainText += block.text+' '
    );
    return plainText.trim(); // Remove last space
  }

  /**
   * Check if input data and state data is different
   * @param  {string} newText plaintext version of data
   * @param  {string} newRaw  JSON strigified RawDraftContentState
   * @return {boolean}
   */
  dataHasChanged(newText, newRaw){
    const { text, raw } = this.state;
    return (text !== newText || raw !== newRaw);
  }

  /**
   * Takes current editorState and stores both raw and
   * plaintext values to database
   * @param  {EditorState} editorState
   */
  storeToDatabase(editorState){
    const rawObj = convertToRaw(
      editorState.getCurrentContent()
    );
    const { id } = this.state;
    const plainText  = this.getPlainTextVersion(rawObj);
    const raw = JSON.stringify(rawObj);

    // This functions gets triggered too often (for example 
    // when cursor moves) and that's why we want to check
    // if plaintext or raw version has changed before storing
    // it to database.
    if(this.dataHasChanged(plainText, raw))
      updateNote(id, plainText, raw);
  }

  /**
   * andle editor change when onChange gets triggered
   * @param  {EditorState} editorState
   */
  handleChange(editorState) {
    this.setState({editorState});
    this.storeToDatabase(editorState);
  }

  /**
   * Handle commands like cmd+(b|i|u)
   * @param  {string}      command
   * @param  {EditorState} editorState
   * @return {string}
   */
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