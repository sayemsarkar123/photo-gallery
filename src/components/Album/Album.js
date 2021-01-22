import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Album = ({ album: { id, album: { title, cover } = {}, galleries } = {} }) => {
  const history = useHistory();
  return (
    <Col md={4} className="mb-3">
      <Card onClick={() => history.push(`/${id}`)} style={{ cursor: 'pointer' }} className="text-white text-center h-100 rounded-0">
        <Card.Img className="h-100 rounded-0" src={cover} alt="Card image" />
        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title className="mb-1">{title}</Card.Title>
          <Card.Text className="text-uppercase">{galleries.length} Galleries</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
};

export default Album;
