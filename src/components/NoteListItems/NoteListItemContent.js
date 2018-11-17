import React, { Component } from 'react';
import moment from 'moment';

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

    return (
      <div>
        <div>
          { this.getItemTitle(note) }
        </div>
        <div>
          <span className={'date'}>
            <i className={'glyphicon glyphicon-time'}></i> { moment(note.createdAt).format('dddd') }
          </span>
        </div>
      </div>
    );
  }
}

export default NoteListItemContent;