import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({show, onHide, onPrimaryActionClick, body, title}) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{ title }</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{ body }</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Cancel</Button>
      <Button bsStyle={'danger'} onClick={onPrimaryActionClick}>Delete</Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmationModal;