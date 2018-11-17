import React, { Component } from 'react';
import moment from 'moment';
import DateRow from './DateRow';

class NoteListItemContent extends Component {
  
  getItemTitle(note){
    if(!note.text.length){
      // Return just a empty string
      return 'New note';
    }else if(note.text.length > 60){
      // Title is too long to display so cut it
      return note.text.substring(0, 60)+'..';
    }else{
      // Return note text as it is
      return note.text;
    }
  }

  render() {
    const { note } = this.props;
    const formatedEditedAt = moment(note.editedAt).format('dddd');

    return (
      <div>
        <div>
          { this.getItemTitle(note) }
        </div>
        <div>
          <DateRow text={formatedEditedAt} />
        </div>
      </div>
    );
  }
}

export default NoteListItemContent;