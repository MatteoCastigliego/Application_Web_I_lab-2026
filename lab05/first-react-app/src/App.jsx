import 'bootstrap/dist/css/bootstrap.min.css';
// Puoi rimuovere l'import di App.css se contiene ancora gli stili di default di Vite

import { Film } from './models/FilmModels.js';
import Header from './components/Header.jsx';
import Filters from './components/Filters.jsx';
import ListOfFilms from './components/ListOfFilms.jsx';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  

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
            <ListOfFilms></ListOfFilms>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
