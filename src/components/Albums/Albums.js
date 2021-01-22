import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Album from '../Album/Album';

const Albums = () => {
  const albums = useSelector(state => state.albums);
  return (
    <Container>
      <Row>
        {
          albums.map(album => <Album key={album.id} album={album}/>)
        }
      </Row>
    </Container>
  );
};

export default Albums;