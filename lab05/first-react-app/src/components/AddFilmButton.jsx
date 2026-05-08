import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import FilmForm from './FilmForm.jsx'

function AddFilmButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Bottone rotondo fluttuante (FAB) */}
      <Button variant="primary" className="fab-button" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Film</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilmForm onSave={(film) => { props.addFilm(film); handleClose(); }} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddFilmButton;