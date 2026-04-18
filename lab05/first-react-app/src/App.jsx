import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Film } from './models/FilmModels.js';
import Header from './components/Header.jsx';
import Filters from './components/Filters.jsx';
import ListOfFilms from './components/ListOfFilms.jsx';
import { useState } from 'react';

function App() {
  

  return (
    <>
      <Header></Header>

      <Filters></Filters>
      <ListOfFilms></ListOfFilms>
    </>
  )
}

export default App
