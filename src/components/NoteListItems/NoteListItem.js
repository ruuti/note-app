import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import moment from 'moment';

import { removeNote }  from '../../firebase';

class NoteListItem extends Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      selectedNote : this.props.match.params.id
    };
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

  getItemTitle(note){
    if(!note.text.length){
      // Return just a edit date
      return moment(note.createdAt).format('dddd');
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
    const pathname = '/'+note.id;
    const active = (note.id === this.state.selectedNote);

    return (
      <Link to={{ pathname }}>
        <ListGroupItem className={ active ? 'active' : '' }>
          <div>
            <div>          
              <span>{ this.getItemTitle(note) }</span>
            </div>
            <div>          
              <span className={'date'}>
                <i className={'glyphicon glyphicon-time'}></i> { moment(note.createdAt).format('dddd') }
              </span>
            </div>
          </div>        
          <button type={'text'} className={'delete'} onClick={() => removeNote(note.id)}>
            <i className={'glyphicon glyphicon-trash'}></i>
          </button>
        </ListGroupItem>
      </Link>
    );
  }
}

export default withRouter(NoteListItem);