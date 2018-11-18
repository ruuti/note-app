import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import NoteListItemContent from './NoteListItemContent';
import NoteListItemSource from './NoteListItemSource';
import { removeNote }  from '../../firebase';
import { IconButton } from '../';

class NoteListItem extends Component {
  
  constructor(props) {
    super(props);
    this.state = { selectedNote: props.match.params.id };
    this.handleRemove = this.handleRemove.bind(this);
  }

  /**
   * Remove note
   */
  handleRemove(){
    removeNote(this.props.note.id);
  }

  /**
   * Listen location changes to detect when new note is loaded
   */
  componentDidMount() {
    this.unlisten = this.props.history.listen(({ pathname }) =>
      this.setState({ selectedNote: pathname.substring(1) }));
  }

  /**
   * Stop listening location changes
   */
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { note } = this.props;
    const pathname = '/'+note.id;
    const isActive = (note.id === this.state.selectedNote);

    return (
      <NoteListItemSource note={note}>
        <Link to={{ pathname }}>
          <ListGroupItem className={ isActive && 'active' }>
            <NoteListItemContent note={note} />
            <IconButton 
              iconClass={'glyphicon-trash'} 
              onClick={this.handleRemove} />
          </ListGroupItem>
        </Link>
      </NoteListItemSource>
    );
  }
}

export default withRouter(NoteListItem);