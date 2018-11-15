import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import moment from 'moment';

import { removeNote }  from '../../firebase';

import './NoteListItem.css';

class NoteListItem extends Component {
  
  getItemTitle(note){
    if(!note.text.length){
      // Return just a edit date
      return moment(note.createdAt).format('dddd');
    }else if(note.text.length > 50){
      // Title is too long to display so cut it
      return note.text.substring(0, 50)+'..';
    }else{
      // Return note text as it is
      return note.text;
    }
  }

  render() {
    const { note, match } = this.props;
    const pathname = '/'+note.id;
    const active = (note.id === match.params.id);

    return (
      <ListGroupItem>
        <Link to={{ pathname }}>
          { this.getItemTitle(note) } ({ active ? 'A' : 'I' })
        </Link>
        <span onClick={() => removeNote(note.id)}>
          Delete
        </span>
      </ListGroupItem>
    );
  }
}

export default withRouter(NoteListItem);