import React from 'react';
import { Card } from 'react-bootstrap';

const Photo = ({ photo, handleShow }) => {
  return (
    <Card onClick={() => handleShow(photo)} style={{ cursor: 'pointer' }} className="rounded-0">
      <Card.Img className="rounded-0" src={photo.photoURL} />
    </Card>
  );
};

export default Photo;
