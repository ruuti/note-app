import React from 'react';
import { Route } from "react-router-dom";
import { Note } from '../';
import { Header } from '../../components';
import { Grid, Row, Col } from 'react-bootstrap';

const Layout = () => (
  <Grid fluid={ true }>
    <Row className={'show-grid header'}>
      <Col xs={12} md={12}>
        <Header />
      </Col>
    </Row>
    <Route path="/:id?" component={Note} />
  </Grid>
)

export default Layout;