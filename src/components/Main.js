import React from 'react';
import Bird from './Bird';

const Main = ({
  home,
  hasCoords,
  lat,
  long,
  getBirds,
  search,
  birdsToShow,
  loading,
  showTheModal,
  addNewBird
}) => {
  if (home) {
    return (
      <div>
        <main>
          {hasCoords ? (
            <button
              className='birdButton ready'
              onClick={() => {
                getBirds(lat, long);
              }}>
              find birds
            </button>
          ) : (
            <button className='birdButton' disabled={true}>
              find birds
            </button>
          )}
          <p className='desc'>find local birds and keep a log </p>
        </main>
        {!hasCoords ? (
          <a
            href='https://www.gps-coordinates.net/geolocation'
            target='_blank'
            rel='noopener noreferrer'>
            <p className='locRequired'>
              <i className='fas fa-exclamation-triangle'></i> location required
            </p>
          </a>
        ) : (
          ''
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <>
        <p style={{ marginTop: '25px' }}>loading birds...</p>
      </>
    );
  }

  if (search && birdsToShow.length === 0) {
    return (
      <div>
        <h4>bird not found...</h4>
      </div>
    );
  }

  return (
    <>
      {birdsToShow.map(bird => (
        <Bird
          bird={bird}
          key={bird.comName}
          showTheModal={showTheModal}
          addNewBird={addNewBird}
        />
      ))}
    </>
  );
};

export default Main;
