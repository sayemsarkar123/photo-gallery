import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory, withRouter } from 'react-router-dom';

const Gallery = ({ gallery: { id, gallery: { name, picture } = {}, photos } = {}, match: { url } }) => {
  const history = useHistory();
  return (
    <Card onClick={() => history.push(`${url}/${id}`)} style={{ cursor: 'pointer' }} className="rounded-0 border-0">
        <Card.Img className="rounded-0" src={picture} alt="Card image" />
        <Card.Body className="px-0">
          <Card.Title className="mb-1">{name}</Card.Title>
          <Card.Text className="text-uppercase">{photos.length} Photos</Card.Text>
        </Card.Body>
    </Card>
  );
};

export default withRouter(Gallery);