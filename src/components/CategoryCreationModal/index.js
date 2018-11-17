import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const CategoryCreationModal = ({show, onHide, onSubmit, inputValue, onChange, onClick}) => (
  <Modal
    show={show}
    onHide={onHide}
    keyboard={true}
    animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new folder</Modal.Title>
      </Modal.Header>
      
      <form onSubmit={onSubmit}>
        <Modal.Body>              
          <input
            type="text"
            value={inputValue} 
            onChange={onChange}
            required={true}
            autoFocus
            placeholder={'Folder name'}
            className={'form-control'} />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClick}>Cancel</Button>
          <Button bsStyle="primary" type="submit">Create folder</Button>
        </Modal.Footer>
      </form>
  </Modal>
);

export default CategoryCreationModal;