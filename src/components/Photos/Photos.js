import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Figure,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Photo from '../Photo/Photo';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addComment } from '../../features/photos/photosSlice';
import dateFormat from 'dateformat';

const schema = yup.object({
  name: yup.string().required('The Name field is required.'),
  email: yup.string().email().required('The Email field is required.'),
  comment: yup.string().required('The Comment field is required.'),
});

const Photos = () => {
  const { albumId, galleryId } = useParams();
  const albums = useSelector((state) => state.albums);
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setPhoto(data);
    setShow(true);
  };
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const response = await fetch('http://localhost:3004/comments', {
      method: 'POST',
      body: JSON.stringify({
        commentId: `${albumId}${galleryId}${photo.id}${comments.length}`,
        ...data,
        createdAt: new Date().toISOString(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    dispatch(addComment(result));
    reset();
  };
  return (
    <Container>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="15px">
          {albums[parseInt(albumId)]?.galleries[
            parseInt(galleryId)
          ]?.photos.map((photo) => (
            <Photo key={photo.id} photo={photo} handleShow={handleShow} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Row noGutters>
            <Col md={6}>
              <Figure>
                <Figure.Image alt={photo.caption} src={photo.photoURL} />
                <Figure.Caption>{photo.caption}</Figure.Caption>
              </Figure>
            </Col>
            <Col className="ml-auto" md={5}>
              <Row>
                {comments
                  .filter((comment) =>
                    comment.commentId.startsWith(
                      `${albumId}${galleryId}${photo.id}`
                    )
                  )
                  .map(({ commentId, name, createdAt, comment }) => (
                    <Col key={commentId} md={12}>
                      <h6 className="mb-0">{name}</h6>
                      <small>
                        {dateFormat(createdAt, 'dddd, mmmm dS, yyyy, h:MM TT')}
                      </small>
                      <p className="mt-2 mb-0">{comment}</p>
                      <hr />
                    </Col>
                  ))}
              </Row>
              <h5>Share Your Comments & Feedback</h5>
              <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    ref={register}
                    isInvalid={!!errors.name}
                    className="rounded-0"
                    name="name"
                    type="text"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    ref={register}
                    isInvalid={!!errors.email}
                    className="rounded-0"
                    name="email"
                    type="email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    ref={register}
                    isInvalid={!!errors.comment}
                    style={{ resize: 'none' }}
                    className="rounded-0"
                    name="comment"
                    as="textarea"
                    rows={3}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.comment?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="rounded-0" variant="warning" type="submit">
                  Share My Comment
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Photos;
