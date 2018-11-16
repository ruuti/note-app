import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Editor } from '../../components';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { NoteList, CategoryList } from '../';

class Note extends Component {

  render() {
    
    // This should be somewhere else, but you know.. 
    const { notes, match } = this.props;
    const note = notes.find(obj => 
      obj.id === match.params.id
    );
    
    if((!match.params.id && notes.length) || (match.params.id && !note && notes.length)){
      const latestNotePath = '/'+notes[0].id;
      return <Redirect to={latestNotePath}  />;
    }

    return (
      <Row className="show-grid wrapper">
       <Col xs={2} md={2} className="categorySidebar split">
          <CategoryList />
        </Col>
        <Col xs={3} md={3} className="sidebar split">
          <NoteList />
        </Col>
        <Col xs={7} md={7} className="editor split">
          <div className={'editor-container'}>
            { note &&
              <Editor note={note} />
            }
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = state => ({
  notes: state.notes.notes
});

export default connect(mapState, null)(Note);