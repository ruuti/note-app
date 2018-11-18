import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import NoteListItemContent from './NoteListItemContent';
import NoteListItemSource from './NoteListItemSource';
import { ConfirmationModal } from '../';
import { removeNote }  from '../../firebase';
import { IconButton } from '../';

class NoteListItem extends Component {
  
  constructor(props) {
    super(props);
    this.state = { selectedNote: props.match.params.id, showModal : false };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  /**
   * Remove note and close confirmation window
   */
  handleRemove(){
    removeNote(this.props.note.id);
    this.handleCloseModal();
  }

  /**
   * Closes note deletion confirmation window
   */
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  /**
   * Opens note deletion confirmation window
   */
  handleShowModal() {
    this.setState({ showModal: true });
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
              onClick={this.handleShowModal} />
          </ListGroupItem>
        </Link>
        <ConfirmationModal 
          show={this.state.showModal} 
          onHide={this.handleCloseModal} 
          onPrimaryActionClick={this.handleRemove}
          title={'Delete note'}
          body={'Are you sure you want to permanently delete selected note?'} />
      </NoteListItemSource>
    );
  }
}

export default withRouter(NoteListItem);