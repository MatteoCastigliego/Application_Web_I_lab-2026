import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Film} from './models/FilmModels.js';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <Filters></Filters>
      <ListOfFilms></ListOfFilms>
    </>
  )
}

export default App
