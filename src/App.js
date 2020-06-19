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
  const [showError, setShowError] = useState(false);

  const screen = window.innerWidth;
  const name = 'bird log';
  const birdsInLog = myLog.map(entry => entry.name.toLowerCase());

  // console.log(birdsInLog);
  const isInLog = bird => {
    if (birdsInLog.includes(bird.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };

  // TOPONDER: figured out added bird state, but it will remain as added as long as the bird name is in the log...so if you see a bird on a different day it would still be in the log and say added and not allow adding again...kinda ok i guess, but that would make this more of a daily log that you clear each time you use it, which would make some sort of save thing nice....ill probably just leave as is for now until a backend is made...

  // EVENTUAL TODOS: maybe a nickname input on modal next to name, make entry component in mylog maybe, then maybe user admin...eventually (once I do the express backend...after finishing relevant fullstackopen chapters), filter and search log eventually, edit log functionality, maybe link to download csv of current log next to clear log link...i think it can be done in node...soo later...

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

  const currentPage = event => setCurrent(event.target.id);

  const getBirds = (lat, long) => {
    setShowError(false);
    setCurrent('home');
    setHome(false);
    setLoading(true);
    birdService
      .getBirds(lat, long)
      .then(avians => {
        setBirds(avians);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setHome(true);
        setShowError(true);
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
      count: 1,
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

  const removeEntry = entry => {
    const log = JSON.parse(localStorage.getItem('mylog'));
    const newLog = log.filter(item => {
      return item.name !== entry;
    });
    localStorage.setItem('mylog', JSON.stringify(newLog));
    setMyLog(newLog);
  };

  const clearLog = () => {
    setMyLog([]);
    localStorage.clear();
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
                  isInLog={isInLog}
                  error={showError}
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
            render={() => (
              <MyLog clearLog={clearLog} removeEntry={removeEntry} />
            )}
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
