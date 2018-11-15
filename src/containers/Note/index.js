import React, { Component } from 'react';
import { connect } from 'react-redux'
import Editor from '../../components/Editor/Editor';
import { Redirect } from 'react-router-dom';

class Note extends Component {

  render() {
    
    // This should be somewhere else, but you know.. 
    const { notes, match } = this.props;
    const note = notes.find(obj => 
      obj.id === match.params.id
    );
    
    if(!note){
      return <Redirect to='/'  />
    }else{
      return (
        <Editor note={note} />
      );
    }
  }
}

const mapState = state => ({
  notes: state.notes.notes
});

export default connect(mapState, null)(Note);