import React, { Component } from 'react'
import NoteListItem from './NoteListItem';
import { ListGroup } from 'react-bootstrap';

class NoteListItems extends Component {
  render() {
  	return (      
      <ListGroup>
		    {this.props.notes.map((note) => (
		      <NoteListItem key={note.id} note={note} />
		    ))}
		  </ListGroup>
    );
  }
}

export default NoteListItems;