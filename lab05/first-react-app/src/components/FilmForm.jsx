import { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import dayjs from 'dayjs';

function FilmForm(props) {
  const [title, setTitle]         = useState('');
  const [watchDate, setWatchDate] = useState('');
  const [rating, setRating]       = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [errors, setErrors]       = useState({});

  useEffect(() => {
    if (props.film) {
      setTitle(props.film.title);
      setWatchDate(props.film.watchDate ? props.film.watchDate.format('YYYY-MM-DD') : '');
      setRating(props.film.rating || '');
      setIsFavorite(props.film.isFavorite);
    } else {
      setTitle(''); setWatchDate(''); setRating(''); setIsFavorite(false);
    }
    setErrors({});
  }, [props.film]);

  const validate = () => {
    const errs = {};
    if (!title || title.trim() === '') errs.title = "Il titolo è obbligatorio.";
    if (watchDate && dayjs(watchDate).isAfter(dayjs())) errs.watchDate = "La data non può essere nel futuro.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    props.onSave({
      title,
      watchDate: watchDate || null,
      rating: rating ? parseInt(rating) : null,
      isFavorite,
    });
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Titolo</Form.Label>
        <Form.Control
          type="text"
          placeholder="es. Inception"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          isInvalid={!!errors.title}
          autoFocus
        />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} sm={6}>
          <Form.Label>Data visione</Form.Label>
          <Form.Control
            type="date"
            value={watchDate}
            onChange={(e) => setWatchDate(e.target.value)}
            isInvalid={!!errors.watchDate}
          />
          <Form.Control.Feedback type="invalid">{errors.watchDate}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          <Form.Label>Valutazione (1–5)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="5"
            placeholder="—"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-4">
        <Form.Check
          type="switch"
          id="favorite-switch"
          label="Segna come preferito ❤️"
          checked={isFavorite}
          onChange={(e) => setIsFavorite(e.target.checked)}
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={props.handleClose}>Annulla</Button>
        <Button type="submit" variant="primary">💾 Salva</Button>
      </div>
    </Form>
  );
}

export default FilmForm;
