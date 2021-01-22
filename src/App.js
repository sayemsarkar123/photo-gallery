import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Galleries from './components/Galleries/Galleries';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Photos from './components/Photos/Photos';
import { addAlbums, addComments } from './features/photos/photosSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const fetchData = async (URL) => {
        const response = await fetch(URL);
        return response.json();
      };
      try {
        const albums = await fetchData('http://localhost:3004/albums');
        dispatch(addAlbums(albums));
        const comments = await fetchData('http://localhost:3004/comments');
        dispatch(addComments(comments));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:albumId" component={Galleries} />
        <Route exact path="/:albumId/:galleryId" component={Photos} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
