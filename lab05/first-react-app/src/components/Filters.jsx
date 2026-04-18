import ListGroup from 'react-bootstrap/ListGroup';

function Filters() {
  return (
    <ListGroup>
      <ListGroup.Item>All</ListGroup.Item>
      <ListGroup.Item>Favourite</ListGroup.Item>
      <ListGroup.Item>Best Rated</ListGroup.Item>
      <ListGroup.Item>Seen Last Month</ListGroup.Item>
      <ListGroup.Item>Unseen</ListGroup.Item>
    </ListGroup>
  );
}

export default Filters;