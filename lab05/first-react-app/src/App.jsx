import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams, Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Film } from './models/FilmModels.js';
import Header from './components/Header.jsx';
import Filters from './components/Filters.jsx';
import ListOfFilms from './components/ListOfFilms.jsx';
import AddFilmButton from './components/AddFilmButton.jsx';
import LoginPage from './components/LoginPage.jsx';
import UserContext from './contexts/UserContext.js';

import { getFilms, addFilm, updateFilm, deleteFilm } from './api/api.js';
import { checkSession } from './api/auth.js';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();

  // --- USER STATE ---
  const [user, setUser] = useState({ id: undefined, email: undefined, name: undefined });

  // Ripristina la sessione al caricamento
  useEffect(() => {
    checkSession().then((result) => {
      if (result) setUser({ id: result.id, email: result.username, name: result.name });
    });
  }, []);

  const doLogin = (newUser) => {
    setUser({ id: newUser.id, email: newUser.username, name: newUser.name });
    navigate('/filter/All');
  };

  const doLogout = () => {
    setUser({ id: undefined, email: undefined, name: undefined });
    setFilms([]);
    navigate('/login');
  };

  // --- FILMS STATE ---
  const [films, setFilms] = useState([]);

  // Carica i film dal server quando l'utente si logga
  useEffect(() => {
    if (!user.id) return;
    getFilms()
      .then((list) => setFilms(list))
      .catch(() => navigate('/login'));
  }, [user.id]);

  // Aggiunge un film
  const handleAddFilm = async (newFilmData) => {
    const { id } = await addFilm({ ...newFilmData, userId: user.id });
    const newFilm = new Film(id, newFilmData.title, newFilmData.isFavorite, newFilmData.rating, newFilmData.watchDate, user.id);
    setFilms((old) => [...old, newFilm]);
  };

  // Aggiorna un film
  const handleUpdateFilm = async (updatedFilm) => {
    await updateFilm(updatedFilm);
    setFilms((old) => old.map((f) => (f.id === updatedFilm.id ? updatedFilm : f)));
  };

  // Elimina un film
  const handleDeleteFilm = async (filmId) => {
    await deleteFilm(filmId);
    setFilms((old) => old.filter((f) => f.id !== filmId));
  };

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route element={<MainLayout doLogout={doLogout} />}>

          <Route path="/login" element={
            user.id ? <Navigate to="/filter/All" replace /> : <LoginPage doLogin={doLogin} />
          } />

          <Route path="*" element={<NotFoundPage />} />

          <Route element={user.id ? <FiltersLayout /> : <Navigate to="/login" replace />}>
            <Route path="/" element={<Navigate to="/filter/All" replace />} />
            <Route path="/filter/:filterId" element={
              <FilmListRoute
                films={films}
                updateFilm={handleUpdateFilm}
                deleteFilm={handleDeleteFilm}
                addFilm={handleAddFilm}
              />
            } />
          </Route>

        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

function MainLayout({ doLogout }) {
  return (
    <>
      <Header doLogout={doLogout} />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <footer className="app-footer">
        🎬 Film Library &nbsp;·&nbsp; Web Applications I &nbsp;·&nbsp; {new Date().getFullYear()}
      </footer>
    </>
  );
}

function FiltersLayout() {
  return (
    <Container fluid className="mt-4 px-4">
      <Row>
        <Col md={3} lg={2}>
          <Filters />
        </Col>
        <Col md={9} lg={10}>
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
      case 'Favourite': return films.filter((f) => f.isFavorite);
      case 'Best Rated': return films.filter((f) => f.rating === 5);
      case 'Seen Last Month': {
        const lastMonth = dayjs().subtract(30, 'day');
        return films.filter((f) => f.watchDate && dayjs(f.watchDate).isAfter(lastMonth));
      }
      case 'Unseen': return films.filter((f) => !f.watchDate);
      default: return films;
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
      <AddFilmButton addFilm={addFilm} />
    </>
  );
}

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-number">404</div>
      <h2 style={{ marginBottom: '0.5rem' }}>Pagina non trovata</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        L'URL inserito non esiste o non è corretto.
      </p>
      <Button as={Link} to="/" variant="primary">🏠 Torna alla home</Button>
    </div>
  );
}

export default App;
