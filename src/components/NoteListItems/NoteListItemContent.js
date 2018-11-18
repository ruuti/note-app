import React, { Component } from 'react';
import moment from 'moment';
import DateRow from './DateRow';

class NoteListItemContent extends Component {
  
  /**
   * Return item title to display from note
   * @param  {object} note to return title from
   * @return {string}      title
   */
  getNoteTitle({text}){
    if(!text.length)
      return 'New note';
    else if(text.length > 61)
      return `${text.substring(0, 60)}..`;
    return text;
  }

  render() {
    const { note } = this.props;
    const title = this.getNoteTitle(note);
    const formatedEditedAt = moment(note.editedAt).format('dddd');

    return (
      <div>
        <div>
          { title }
        </div>
        <div>
          <DateRow text={formatedEditedAt} />
        </div>
      </div>
    );
  }
}

export default NoteListItemContent;