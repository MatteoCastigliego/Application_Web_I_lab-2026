import { Row, Col, Table, Button } from 'react-bootstrap';
import { Pencil, Trash, StarFill, Star, HeartFill, Heart } from 'react-bootstrap-icons';

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
                {films.map((f) => <FilmRow key={f.id} film={f} />)}
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
            <FilmActionButtons film={f} />
        </tr>
    );
}

function FilmActionButtons(props) {
    return (
        <td>
            <Button variant='warning' className='me-2'><Pencil /></Button>
            <Button variant='danger'><Trash /></Button>
        </td>
    );
}

function ListOfFilms(props) {
    return (
        <>
            <Row>
                <Col as='h2' className='text-start'>Filter: {props.activeFilter}</Col>
            </Row>
            <Row>
                <FilmTable films={props.films} />
            </Row>
        </>
    );
}

export default ListOfFilms;