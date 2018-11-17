import React from 'react';
import NoteListItem from './NoteListItem';
import { ListGroup } from 'react-bootstrap';

const NoteListItems = ({notes}) => (
  <ListGroup>
    {notes.map((note) => (
      <NoteListItem key={note.id} note={note} />
    ))}
  </ListGroup>
);

export default NoteListItems;