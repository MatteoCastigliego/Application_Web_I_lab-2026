import ListGroup from 'react-bootstrap/ListGroup';

function Filters(props) {
  const { activeFilter, onSelectFilter } = props;
  const filters = ['All', 'Favourite', 'Best Rated', 'Seen Last Month', 'Unseen'];

  return (
    <ListGroup>
      {filters.map(filter => (
        <ListGroup.Item 
          key={filter} 
          active={activeFilter === filter}
          onClick={() => onSelectFilter(filter)}
          action 
        >
          {filter}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Filters;