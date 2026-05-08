import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { Trash, StarFill, Star, HeartFill, Heart, Pencil } from 'react-bootstrap-icons';
import { useState } from 'react';
import FilmForm from './FilmForm.jsx';
import { Film } from '../models/FilmModels.js';


function ListOfFilms(props) {
    return (
        <>
            <Row>
                <Col as='h2' className='text-start'>Filter: {props.activeFilter}</Col>
            </Row>
            <Row>
                <FilmTable films={props.films} updateFilm={props.updateFilm} />
            </Row>
        </>
    );
}

function FilmTable(props) {
    const films = props.films;

    return (
        <Table striped hover>
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Favorite</th>
                    <th scope="col">Date</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {films.map((f) => <FilmRow key={f.id} film={f} updateFilm={props.updateFilm} />)}
            </tbody>
        </Table>
    );
}

function FilmRow(props) {
    const f = props.film;

    // Funzione helper per renderizzare le stelline piene/vuote
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (rating && i < rating) stars.push(<StarFill key={i} />);
            else stars.push(<Star key={i} />);
        }
        return stars;
    };

    return (
        <tr>
            <td>{f.title}</td>
            <td>{f.isFavorite ? <HeartFill color="red" /> : <Heart />}</td>
            <td>{f.watchDate ? f.watchDate.format('YYYY-MM-DD') : ''}</td>
            <td>{renderStars(f.rating)}</td>
            <FilmActionButtons film={f} updateFilm={props.updateFilm} />
        </tr>
    );
}

function FilmActionButtons(props) {
    return (
        <td>
            <EditFilmButton film={props.film} updateFilm={props.updateFilm} />
            <Button variant='danger'><Trash /></Button>
        </td>
    );
}


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

export default ListOfFilms;
