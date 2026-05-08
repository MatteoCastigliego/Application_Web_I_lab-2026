import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import FilmForm from './FilmForm.jsx';
import { Film } from '../models/FilmModels.js';

function EditFilmButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = (filmData) => {
    const updatedFilm = new Film(
      props.film.id,
      filmData.title,
      filmData.isFavorite,
      filmData.rating,
      filmData.watchDate,
      props.film.userId
    );
    props.updateFilm(updatedFilm);
    handleClose();
  };

  return (
    <>
      <Button variant='warning' className='me-2' onClick={handleShow}>
        <Pencil />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Film</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilmForm film={props.film} onSave={handleSave} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditFilmButton;