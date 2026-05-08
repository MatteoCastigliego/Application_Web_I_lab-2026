import { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import dayjs from 'dayjs';

function FilmForm(props) {
  // states for form
  const [title, setTitle] = useState('');
  const [watchDate, setWatchDate] = useState('');
  const [rating, setRating] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const [errors, setErrors] = useState({});

  /* if the film is present (modify mode) we take present parameters
     if not ProgressEvent, we are creating a new one so in the form anything is showed */
  useEffect(() => {
    if (props.film) {
      setTitle(props.film.title);
      setWatchDate(props.film.watchDate ? props.film.watchDate.format('YYYY-MM-DD') : '');
      setRating(props.film.rating || '');
      setIsFavorite(props.film.isFavorite);
    } else {
      setTitle('');
      setWatchDate('');
      setRating('');
      setIsFavorite(false);
    }
    // Resetta gli errori quando il film cambia (es. chiudendo e riaprendo la modale)
    setErrors({});
  }, [props.film]);

  const validateForm = () => {
    const newErrors = {};
    if (!title || title.trim() === '') {
      newErrors.title = "Title is mandatory and can't contain only spaces.";
    }
    if (watchDate && dayjs(watchDate).isAfter(dayjs())) {
      newErrors.watchDate = "Watch date can't be in the future.";
    }
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // No errors, save it
      // Take datas and then call the function
      const newFilm = {
        title: title,
        watchDate: watchDate || null,
        rating: rating ? parseInt(rating) : 0,
        isFavorite: isFavorite
      };
      props.onSave(newFilm);
    } else {
      // there are errors
      setErrors(formErrors);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Watch Date</Form.Label>
          <Form.Control
            type="date"
            value={watchDate}
            onChange={(e) => setWatchDate(e.target.value)}
            isInvalid={!!errors.watchDate}
          />
          <Form.Control.Feedback type="invalid">
            {errors.watchDate}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Rating (0-5)</Form.Label>
          <Form.Control 
            type="number" 
            min="0" max="5" 
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid rating between 0 and 5.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check label="Favourite" checked={isFavorite} onChange={(e) => setIsFavorite(e.target.checked)} />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={props.handleClose}>Close</Button>
        <Button type="submit" variant="primary">Save Changes</Button>
      </div>
    </Form>
  );
}

export default FilmForm;