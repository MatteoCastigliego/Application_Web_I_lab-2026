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
      <Button 
        variant="primary" 
        className="rounded-circle shadow-lg d-flex align-items-center justify-content-center" 
        onClick={handleShow}
        style={{ position: 'fixed', bottom: '2.5rem', right: '2.5rem', width: '65px', height: '65px', fontSize: '2rem', zIndex: 1000, transition: 'transform 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ marginTop: '-4px' }}>+</span>
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-primary">🎬 Aggiungi Nuovo Film</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilmForm onSave={(film) => { props.addFilm(film); handleClose(); }} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddFilmButton;