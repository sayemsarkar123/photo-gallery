import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Gallery from '../Gallery/Gallery';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Galleries = () => {
  const { albumId } = useParams();
  const albums = useSelector((state) => state.albums);
  return (
    <Container>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="30px">
          {albums[parseInt(albumId)]?.galleries.map((gallery) => (
            <Gallery key={gallery.id} gallery={gallery} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Container>
  );
};

export default Galleries;
