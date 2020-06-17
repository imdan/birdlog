import React, { useState } from 'react';

const Modal = ({ newBird, hideTheModal, updateLog }) => {
  const [count, setCount] = useState(1);
  const [where, setWhere] = useState('');
  const [notes, setNotes] = useState('');

  const handleWhere = event => setWhere(event.target.value);
  const handleCount = event => setCount(event.target.value);
  const handleNotes = event => setNotes(event.target.value);

  const addToLog = b => {
    const wikiName = b.name.replace(' ', '_');

    const birdToAdd = {
      name: b.name,
      sciName: b.sciName,
      count: count,
      when: b.when,
      where: where.toString(),
      notes: notes.toString(),
      wikiLink: `https://en.wikipedia.org/wiki/${wikiName}`,
      photoUrl: `https://www.google.com/search?tbm=isch&q=${b.name}%20site:ebird.org`
    };

    if (localStorage.getItem('mylog') !== null) {
      const log = JSON.parse(localStorage.getItem('mylog'));
      log.push(birdToAdd);
      localStorage.setItem('mylog', JSON.stringify(log));
      //   console.log('existing', log);
    } else {
      const log = [];
      log.push(birdToAdd);
      localStorage.setItem('mylog', JSON.stringify(log));
      //   console.log('new', log);
    }

    hideTheModal();
    updateLog();
  };

  return (
    <div className='modalContainer'>
      <div className='modal'>
        <h2>{newBird.name}</h2>
        <h4>{newBird.sciName}</h4>
        count:{' '}
        <input
          className='modalCount'
          type='number'
          value={count}
          onChange={handleCount}
          max={20}
          min={1}
        />
        <p>when: {newBird.when}</p>
        where:{' '}
        <input
          className='modalInput'
          value={where}
          onChange={handleWhere}
          placeholder='green birdhouse, backyard, park, etc...'
        />
        <br />
        notes:{' '}
        <input
          className='modalInput'
          value={notes}
          onChange={handleNotes}
          placeholder={`a chunky little ${newBird.sciName}`}
        />
        <button
          className='modalButton'
          onClick={e => {
            e.preventDefault();
            addToLog(newBird);

            // handle successful add here...maybe...might not need to do anything here
            console.log(`added ${newBird.name}`);
          }}>
          add to log
        </button>
        <div className='closeModal' onClick={hideTheModal}>
          +
        </div>
      </div>
    </div>
  );
};

export default Modal;
