import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateNote }  from '../../firebase';
import './Editor.css';

/**
 * Note UI editor to edit active note.
 * Renders textarea.
 */
class Editor extends Component {

  constructor(props) {
    super(props);

    const { note } = props;    
    this.state = note;

    this.handleChange = this.handleChange.bind(this);
  }

  // Update state when user navigates to 
  // a new note.
  componentWillReceiveProps(nextProps) {
    const { note } = nextProps;
    if (this.state.note !== note) {
      this.setState(note);
    }
  }

  // Handle textarea change when onChange gets
  // triggered
  handleChange(event) {
    this.setState({text: event.target.value}, () => {
      const { id, text } = this.state;
      updateNote(id, text);
    });
  }

  // Render textarea for a note
  render() {
    return (
      <textarea 
        value={this.state.text} 
        onChange={this.handleChange}
        className="form-control notearea">
      </textarea>
    );
  }
}

export default connect()(Editor);