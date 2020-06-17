import React from 'react';

const Bird = ({ bird, showTheModal, addNewBird, isInLog }) => {
  // const bird = birds[10];

  const inLog = isInLog(bird.comName);

  // i think i could pass myLog into here then check if myLog contains bird name and return true or false, then use that to set or unset the addButton, maybe just a check mark when and/or if added and keep remove funct in mylog page, this is also how I can prevent duplicates, just dont allow add if bird is in mylog...should work i think and can get rid of the added pos that isnt even working atm

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
      {inLog ? (
        <div className='added'>
          <i className='fas fa-check'></i>
        </div>
      ) : (
        <div
          className='addButton'
          onClick={() => {
            // addToLog(bird);
            showTheModal();
            addNewBird(bird);
          }}>
          +
        </div>
      )}
    </div>
  );
};

export default Bird;
