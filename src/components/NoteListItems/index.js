import React, { Component } from 'react'
import NoteListItem from './NoteListItem';
import { ListGroup } from 'react-bootstrap';

class NoteListItems extends Component {
  render() {
  	const { notes } = this.props;
  	return (   
      <div>
	      { notes.length ? (
		      <ListGroup>
				    {notes.map((note) => (
				      <NoteListItem key={note.id} note={note} />
				    ))}
				  </ListGroup>
				 ) : (
				 	<p>Nothing here..</p>
				 )}
			 </div>
    );
  }
}

export default NoteListItems;