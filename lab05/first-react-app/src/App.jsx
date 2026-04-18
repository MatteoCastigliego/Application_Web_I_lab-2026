import 'bootstrap/dist/css/bootstrap.min.css';
// Puoi rimuovere l'import di App.css se contiene ancora gli stili di default di Vite

import { Film } from './models/FilmModels.js';
import Header from './components/Header.jsx';
import Filters from './components/Filters.jsx';
import ListOfFilms from './components/ListOfFilms.jsx';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const film1 = new Film(1, "Mare Fuori", true, "10/03/2025", 4, 2);
  const film2 = new Film(2, "Quo Vado?", true, "14/02/2019", 3, 1);
  const film3 = new Film(3, "Suits", true, "16/12/2020", 5, 1);
  const film4 = new Film(4, "Harry Potter", false,"25/05/1991", 3, 3);
  const film5 = new Film(5, "Benvenuti al Sud", false, "11/01/1974", 3, 4);
  const film6 = new Film(6, "Fast And Furious", true, "24/07/1975", 4, 2);
  
  const FilmsList = [];
  FilmsList.push(film1)
  FilmsList.push(film2)
  FilmsList.push(film3)
  FilmsList.push(film4)
  FilmsList.push(film5)
  FilmsList.push(film6)

  const [film, setFilms] = useState(FilmsList)

  return (
    <>
      <Header></Header>
      
      {/* Griglia Bootstrap per il layout principale */}
      <Container fluid className="mt-3">
        <Row>
          <Col md={4}>
            <Filters></Filters>
          </Col>
          <Col md={8}>
            <ListOfFilms film = {film}></ListOfFilms>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
