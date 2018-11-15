import React, { Component } from 'react';
import { Route } from "react-router-dom";

import { Note, NoteList, CategoryList } from '../';
import { Header } from '../../components';

import { Grid, Row, Col } from 'react-bootstrap';

class Layout extends Component {

  render() {
    
    return (
      <Grid fluid={ true }>
        <Row className="show-grid header">
          <Col xs={12} md={12}>
            <Header />
          </Col>
        </Row>
        <Row className="show-grid wrapper">
         <Col xs={2} md={2} className="sidebar split">
            <CategoryList />
          </Col>
         <Col xs={3} md={3} className="sidebar split">
            <NoteList />
          </Col>
          <Col xs={7} md={7} className="editor split">
            <Route path="/:id" component={Note} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Layout;
