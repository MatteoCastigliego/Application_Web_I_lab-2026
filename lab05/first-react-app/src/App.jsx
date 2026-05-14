import 'bootstrap/dist/css/bootstrap.min.css';
// Puoi rimuovere l'import di App.css se contiene ancora gli stili di default di Vite

import { Film } from './models/FilmModels.js';
import Header from './components/Header.jsx';
import Filters from './components/Filters.jsx';
import ListOfFilms from './components/ListOfFilms.jsx';
import AddFilmButton from './components/AddFilmButton.jsx'
import LoginPage from './components/LoginPage.jsx';
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import dayjs from 'dayjs';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams, Link } from 'react-router-dom';

function App() {
  const film1 = new Film(1, "Mare Fuori", true, 4, "2025-03-10", 2);
  const film2 = new Film(2, "Quo Vado?", true, 3, "2019-02-14", 1);
  const film3 = new Film(3, "Suits", true, 5, "2020-12-16", 1);
  const film4 = new Film(4, "Harry Potter", false, 3, "1991-05-25", 3);
  const film5 = new Film(5, "Benvenuti al Sud", false, 3, "1974-01-11", 4);
  const film6 = new Film(6, "Fast And Furious", true, 4, "1975-07-24", 2);

  const FilmsList = [];
  FilmsList.push(film1)
  FilmsList.push(film2)
  FilmsList.push(film3)
  FilmsList.push(film4)
  FilmsList.push(film5)
  FilmsList.push(film6)

  const [film, setFilms] = useState(FilmsList)

  // Funzione per aggiungere un nuovo film alla lista
  const addFilm = (newFilmData) => {
    const newId = Math.max(0, ...film.map(f => f.id)) + 1;
    const newFilm = new Film(newId, newFilmData.title, newFilmData.isFavorite, newFilmData.rating, newFilmData.watchDate, 1);
    setFilms((oldFilms) => [...oldFilms, newFilm]);
  };

  // Funzione per aggiornare un film esistente
  const updateFilm = (updatedFilm) => {
    setFilms((oldFilms) => oldFilms.map(f => f.id === updatedFilm.id ? updatedFilm : f));
  };

  // Punto 2: Funzione per eliminare un film (da usare nei bottoni in riga)
  const deleteFilm = (filmId) => {
    setFilms((oldFilms) => oldFilms.filter(f => f.id !== filmId));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}> {/* main layout */}
          
          {/* Routes for different pages */}
          <Route path="/login" element={<LoginPage />} />
          {/* Rotta per gestire tutti gli URL inesistenti (404 Not Found) */}
          <Route path="*" element={<NotFoundPage />} />

          <Route element={<FiltersLayout />}>
            {/* Each filter has a different layout */}
            <Route path="/" element={<Navigate to="/filter/All" replace />} />
            
            <Route path="/filter/:filterId" element={
              <FilmListRoute 
                films={film} 
                updateFilm={updateFilm} 
                deleteFilm={deleteFilm} 
                addFilm={addFilm} 
              />
            } />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function MainLayout() {
  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh' }}>
        <Outlet />
      </div>
      <footer className="text-center py-4 text-muted bg-light mt-auto">
        <small>&copy; 2024 Film Library Application</small>
      </footer>
    </>
  );
}

function FiltersLayout() {
  return (
      <Container fluid className="mt-3">
        <Row>
          <Col md={4}>
            <Filters />
          </Col>
          <Col md={8}>
            <Outlet />
          </Col>
        </Row>
      </Container>
  );
}

function FilmListRoute({ films, updateFilm, deleteFilm, addFilm }) {
  const { filterId } = useParams();

  const getFilteredFilms = () => {
    switch (filterId) {
      case 'Favourite': return films.filter(f => f.isFavorite);
      case 'Best Rated': return films.filter(f => f.rating === 5);
      case 'Seen Last Month':
        const lastMonth = dayjs().subtract(30, 'day');
        return films.filter(f => f.watchDate && dayjs(f.watchDate).isAfter(lastMonth));
      case 'Unseen': return films.filter(f => !f.watchDate);
      default: return films; // 'All'
    }
  };

  return (
    <>
      <ListOfFilms 
        films={getFilteredFilms()} 
        activeFilter={filterId} 
        updateFilm={updateFilm} 
        deleteFilm={deleteFilm}
      />
      {/* The button for adding a film is placed here because the section of filter is defined as homepage of the website */}
      <AddFilmButton addFilm={addFilm} /> 
    </>
  );
}

function NotFoundPage() {
  return (
    <Container className="mt-5 text-center">
      <h1 className="display-1 text-danger">404</h1>
      <h2>Page not fount!</h2>
      <p className="lead">Inserted URL doesn't exist or is wrong</p>
      <Button as={Link} to="/" variant="primary" className="mt-3">Go Home</Button>
    </Container>
  );
}

export default App
