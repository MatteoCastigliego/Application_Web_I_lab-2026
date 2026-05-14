import { NavLink } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

function Filters() {
  return (
    <ListGroup variant="flush" className="mb-3">
      {/* 
        Passando una funzione a className, NavLink ci permette di iniettare 
        la classe 'active' di bootstrap solo quando l'URL corrisponde. 
      */}
      <NavLink 
        to="/filter/All" 
        className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
      >
        All
      </NavLink>
      <NavLink 
        to="/filter/Favourite" 
        className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
      >
        Favourite
      </NavLink>
      <NavLink 
        to="/filter/Best Rated" 
        className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
      >
        Best Rated
      </NavLink>
      <NavLink 
        to="/filter/Seen Last Month" 
        className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
      >
        Seen Last Month
      </NavLink>
      <NavLink 
        to="/filter/Unseen" 
        className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
      >
        Unseen
      </NavLink>
    </ListGroup>
  );
}

export default Filters;
