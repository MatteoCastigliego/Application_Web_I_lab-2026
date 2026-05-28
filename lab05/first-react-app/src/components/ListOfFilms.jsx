import { Table, Button, Modal } from 'react-bootstrap';
import { Trash, StarFill, Star, HeartFill, Heart, Pencil } from 'react-bootstrap-icons';
import { useState } from 'react';
import FilmForm from './FilmForm.jsx';
import { Film } from '../models/FilmModels.js';

const FILTER_ICONS = {
  'All': '🎬',
  'Favourite': '❤️',
  'Best Rated': '⭐',
  'Seen Last Month': '🕐',
  'Unseen': '👁️',
};

function ListOfFilms(props) {
  return (
    <div className="fade-in bg-white p-4 rounded-4 shadow-sm mb-5">
      <h2 className="filter-title fw-bold mb-4 d-flex align-items-center gap-3">
        <span className="bg-primary bg-opacity-10 text-primary rounded-circle p-2 fs-3 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>{FILTER_ICONS[props.activeFilter] || '🎬'}</span>
        {props.activeFilter}
        <span className="badge bg-secondary rounded-pill fs-6 opacity-75">
          {props.films.length}
        </span>
      </h2>

      {props.films.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center p-5 border border-2 border-dashed rounded-4 bg-light text-muted mt-3">
          <div style={{ fontSize: '4rem', opacity: 0.5, filter: 'grayscale(100%)' }}>📭</div>
          <h5 className="mt-3 fw-normal">Nessun film in questa categoria.</h5>
        </div>
      ) : (
        <FilmTable films={props.films} updateFilm={props.updateFilm} deleteFilm={props.deleteFilm} />
      )}
    </div>
  );
}

function FilmTable(props) {
  return (
    <Table responsive hover borderless className="align-middle mb-0 mt-2">
      <thead className="table-light text-muted">
        <tr style={{ borderBottom: '2px solid #f8f9fa' }}>
          <th className="ps-3 py-3 fw-semibold rounded-start">Titolo</th>
          <th className="py-3 fw-semibold">Preferito</th>
          <th className="py-3 fw-semibold">Data visione</th>
          <th className="py-3 fw-semibold">Valutazione</th>
          <th className="text-end pe-3 py-3 fw-semibold rounded-end">Azioni</th>
        </tr>
      </thead>
      <tbody>
        {props.films.map((f) => (
          <FilmRow key={f.id} film={f} updateFilm={props.updateFilm} deleteFilm={props.deleteFilm} />
        ))}
      </tbody>
    </Table>
  );
}

function FilmRow(props) {
  const f = props.film;

  const toggleFavorite = () => {
    props.updateFilm(new Film(f.id, f.title, !f.isFavorite, f.rating, f.watchDate, f.userId));
  };

  const updateRating = (newRating) => {
    props.updateFilm(new Film(f.id, f.title, f.isFavorite, newRating, f.watchDate, f.userId));
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) =>
      rating && i < rating
        ? <StarFill key={i} className="star-icon filled" onClick={() => updateRating(i + 1)} />
        : <Star     key={i} className="star-icon"        onClick={() => updateRating(i + 1)} />
    );

  return (
    <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
      <td className="film-title-cell ps-3 fw-bold text-dark fs-6">{f.title}</td>
      <td onClick={toggleFavorite} style={{ cursor: 'pointer' }}>
        {f.isFavorite
          ? <HeartFill className="text-danger fs-4 shadow-sm rounded-circle p-2 bg-danger bg-opacity-10" style={{ transition: 'transform 0.2s', width: '38px', height:'38px' }} />
          : <Heart     className="text-secondary fs-4 p-2" style={{ width: '38px', height:'38px' }} />}
      </td>
      <td>
        {f.watchDate
          ? <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold border border-primary border-opacity-25">{f.watchDate.format('DD/MM/YYYY')}</span>
          : <span className="text-muted fst-italic fs-6 px-3 py-2">—</span>}
      </td>
      <td>
        <div className="d-flex gap-1 fs-5 text-warning">{renderStars(f.rating)}</div>
      </td>
      <td className="text-end pe-3">
        <div className="d-flex gap-2 justify-content-end">
          <EditFilmButton film={f} updateFilm={props.updateFilm} />
          <DeleteFilmButton film={f} deleteFilm={props.deleteFilm} />
        </div>
      </td>
    </tr>
  );
}

function EditFilmButton({ film, updateFilm }) {
  const [show, setShow] = useState(false);

  const handleSave = (filmData) => {
    updateFilm(new Film(film.id, filmData.title, filmData.isFavorite, filmData.rating, filmData.watchDate, film.userId));
    setShow(false);
  };

  return (
    <>
      <Button variant="warning" size="sm" onClick={() => setShow(true)} title="Modifica">
        <Pencil />
      </Button>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>✏️ Modifica film</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilmForm film={film} onSave={handleSave} handleClose={() => setShow(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
}

function DeleteFilmButton({ film, deleteFilm }) {
  return (
    <Button variant="danger" size="sm" onClick={() => deleteFilm(film.id)} title="Elimina">
      <Trash />
    </Button>
  );
}

export default ListOfFilms;
