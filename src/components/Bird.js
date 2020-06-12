import React, { useState } from 'react';

const Bird = ({ bird, showTheModal, addNewBird }) => {
  const [added, setAdded] = useState(false);

  // const bird = birds[10];

  const seenDate = new Date(bird.obsDt);
  const wikiName = bird.comName.replace(' ', '_');

  return (
    <div className='bird'>
      <h2>{bird.comName}</h2>
      <h4>{bird.sciName}</h4>
      <p>
        seen at {bird.locName} on {seenDate.toDateString()}
      </p>
      <a
        href={`https://en.wikipedia.org/wiki/${wikiName}`}
        target='_blank'
        rel='noopener noreferrer'
        className='link wikiLink'>
        wiki
      </a>
      <a
        href={`https://www.google.com/search?tbm=isch&q=${bird.comName}%20site:ebird.org`}
        target='_blank'
        rel='noopener noreferrer'
        className='link photoLink'>
        photos
      </a>
      {added ? (
        <div
          className='added'
          onClick={() => {
            console.log('remove bird');
            setAdded(false);
          }}></div>
      ) : (
        <div
          className='addButton'
          onClick={() => {
            // addToLog(bird);
            showTheModal();
            addNewBird(bird);
          }}></div>
      )}
    </div>
  );
};

export default Bird;
