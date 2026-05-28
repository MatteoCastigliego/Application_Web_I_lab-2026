import { NavLink } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

const FILTERS = [
  { id: 'All',             label: 'Tutti i film',    icon: '🎬' },
  { id: 'Favourite',       label: 'Preferiti',        icon: '❤️' },
  { id: 'Best Rated',      label: 'Meglio valutati',  icon: '⭐' },
  { id: 'Seen Last Month', label: 'Visti di recente', icon: '🕐' },
  { id: 'Unseen',          label: 'Non ancora visti', icon: '👁️' },
];

function Filters() {
  return (
    <div className="sidebar-section bg-white p-3 rounded-4 shadow-sm">
      <h5 className="sidebar-title fw-bold mb-3 text-primary px-2">Filtri</h5>
      <ListGroup variant="flush" className="gap-1">
        {FILTERS.map(({ id, label, icon }) => (
          <NavLink
            key={id}
            to={`/filter/${id}`}
            className={({ isActive }) =>
              `list-group-item list-group-item-action d-flex align-items-center gap-3 rounded-3 border-0 py-2 ${isActive ? 'active shadow-sm fw-bold' : 'text-secondary'}`
            }
          >
            <span className="fs-5 bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </ListGroup>
    </div>
  );
}

export default Filters;
