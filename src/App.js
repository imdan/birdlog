import React, { useState, useEffect } from 'react';
import './App.css';
import Utils from './components/Utils';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Main from './components/Main';
import birdService from './services/birdService';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './pages/About';
import MyLog from './pages/MyLog';
import Modal from './components/Modal';
import NotFound from './pages/NotFound';

function App() {
  const [birds, setBirds] = useState([]);
  const [home, setHome] = useState(true);
  const [inView, setInView] = useState(20);
  const [search, setSearch] = useState('');
  const [inputHasFocus, setInputHasFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [current, setCurrent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [birdToAdd, setBirdToAdd] = useState(null);
  const [myLog, setMyLog] = useState([]);

  const screen = window.innerWidth;
  const name = 'bird log';

  // need to handle the remove from log functionality on bird and in mylog, prevent duplicate logs, somehow persist bird added state when main rerenders maybe or just check if bird is in log, clear log confirm modal, probably more idk....make entry component in mylog maybe, the maybe user admin...eventually

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude.toFixed(2));
      setLong(position.coords.longitude.toFixed(2));
    });

    const log =
      JSON.parse(localStorage.getItem('mylog')) !== null
        ? JSON.parse(localStorage.getItem('mylog'))
        : [];

    setMyLog(log);
  }, []);

  const hasCoords = lat && long ? true : false;

  let birdsToShow = search
    ? birds.filter(bird =>
        bird.comName.toLowerCase().includes(search.toLowerCase())
      )
    : birds.slice(0, inView);

  const more = birdsToShow.length === birds.length ? false : true;

  const currentPage = event => setCurrent(event.target.innerHTML);

  const getBirds = (lat, long) => {
    setHome(false);
    setLoading(true);
    birdService
      .getBirds(lat, long)
      .then(avians => {
        setBirds(avians);
        setLoading(false);
      })
      .catch(err => {
        console.error('fack...', err);
      });
  };

  const loadMore = () => {
    const addMore = inView + 20;
    setInView(addMore);
  };

  const handleSearch = event => setSearch(event.target.value);

  const clearSearch = () => {
    if (search) {
      setSearch('');
    }
  };

  const addNewBird = b => {
    const wikiName = b.comName.replace(' ', '_');

    const newBird = {
      name: b.comName,
      sciName: b.sciName,
      count: 0,
      when: new Date(Date.now()).toLocaleString(),
      where: '',
      notes: '',
      wikiLink: `https://en.wikipedia.org/wiki/${wikiName}`,
      photoUrl: `https://www.google.com/search?tbm=isch&q=${b.comName}%20site:ebird.org`
    };

    setBirdToAdd(newBird);
  };

  const updateLog = () => {
    const log = JSON.parse(localStorage.getItem('mylog'));

    setMyLog(log);
  };

  const clearLog = () => {
    if (window.confirm('are you sure?')) {
      setMyLog([]);
      localStorage.clear();
    }
  };

  const showTheModal = () => setShowModal(true);
  const hideTheModal = () => setShowModal(false);

  const giveFocus = () => setInputHasFocus(true);
  const removeFocus = () => setInputHasFocus(false);

  return (
    <Router>
      <div className='App'>
        <Header current={currentPage} />

        <h1>{name}</h1>

        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <>
                {!home && !loading && (
                  <SearchBar
                    search={search}
                    handleChange={handleSearch}
                    handleFocus={giveFocus}
                    handleBlur={removeFocus}
                    clearSearch={clearSearch}
                  />
                )}

                {showModal ? (
                  <Modal
                    newBird={birdToAdd}
                    hideTheModal={hideTheModal}
                    updateLog={updateLog}
                  />
                ) : (
                  <></>
                )}

                <Main
                  home={home}
                  hasCoords={hasCoords}
                  lat={lat}
                  long={long}
                  getBirds={getBirds}
                  search={search}
                  birdsToShow={birdsToShow}
                  loading={loading}
                  addNewBird={addNewBird}
                  showTheModal={showTheModal}
                  hideTheModal={hideTheModal}
                />

                {!home && !loading && (
                  <Utils
                    handleClick={loadMore}
                    more={more}
                    search={search}
                    length={birdsToShow.length}
                  />
                )}
              </>
            )}
          />
          <Route exact path='/about' component={About} />
          <Route
            exact
            path='/mylog'
            render={() => <MyLog clearLog={clearLog} />}
          />
          <Route component={NotFound} />
        </Switch>

        <Footer
          length={birdsToShow.length}
          focus={inputHasFocus}
          screen={screen}
          current={current}
          logLength={myLog.length}
        />
      </div>
    </Router>
  );
}

export default App;
