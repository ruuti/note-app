import React from 'react';
import { Modal } from 'react-bootstrap';

const CategoryCreationModal = ({show, onHide, onSubmit, inputValue, onChange, onClick, maxLength}) => (
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
            type={'text'}
            value={inputValue} 
            onChange={onChange}
            required={true}
            autoFocus
            placeholder={'Type a new folder name..'}
            className={'form-control'}
            maxLength={maxLength} />
        </Modal.Body>

        <Modal.Footer>
          <button type="submit" className={'btn btn-green btn-block btn-big'}>
            <i className={'glyphicon glyphicon-plus'}></i> {'Create folder'}
          </button>
        </Modal.Footer>
      </form>
  </Modal>
);

export default CategoryCreationModal;