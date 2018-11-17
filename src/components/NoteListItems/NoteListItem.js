import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";

import NoteListItemContent from './NoteListItemContent';

import { removeNote }  from '../../firebase';
import { IconButton } from '../';

class NoteListItem extends Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      selectedNote : this.props.match.params.id
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(){
    removeNote(this.props.note.id);
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen( location =>  {
      // TODO: change this.
      this.setState({
        selectedNote: location.pathname.substring(1)
      });  
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { note } = this.props;
    const pathname = '/'+note.id;
    const isActive = (note.id === this.state.selectedNote);

    return (
      <Link to={{ pathname }}>
        <ListGroupItem className={ isActive ? 'active' : '' }>
          <NoteListItemContent note={note} />
          <IconButton 
            buttonClass={'delete'}
            iconClass={'glyphicon-trash'} 
            onClick={this.handleRemove} />
        </ListGroupItem>
      </Link>
    );
  }
}

export default withRouter(NoteListItem);