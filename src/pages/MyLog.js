import React, { useState } from 'react';
import Confirm from '../components/Confirm';

const MyLog = ({ clearLog, removeEntry }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [toRemove, setToRemove] = useState('');

  const entries = JSON.parse(localStorage.getItem('mylog'));
  // console.log(entries);
  const note =
    "***Logs are currently being stored in your browser's local storage so, for now, they are not permanent and may be lost depending on browser settings.";

  const hideModal = () => {
    setShowConfirm(false);
  };

  if (entries === null || entries.length === 0) {
    return (
      <>
        <div>
          <p style={{ margin: '0 8vw', fontSize: '11px' }}>{note}</p>

          <h3>no entries...</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='myLog'>
        <p style={{ margin: '0 8vw', fontSize: '11px' }}>{note}</p>
        <div
          onClick={() => {
            setToRemove('all birds');
            setShowConfirm(true);
          }}
          className='clearLog'>
          clear log
        </div>
        {showConfirm ? (
          <Confirm
            clearLog={clearLog}
            hideModal={hideModal}
            toRemove={toRemove}
            removeEntry={removeEntry}
          />
        ) : (
          ''
        )}
        {entries.reverse().map(entry => {
          return (
            <div className='bird' key={entry.name}>
              <h2>{entry.name}</h2>
              <h4>{entry.sciName}</h4>
              <p>count: {entry.count}</p>
              <p>when: {entry.when}</p>
              {entry.where ? <p>where: {entry.where}</p> : ''}
              {entry.notes ? <p>notes: {entry.notes}</p> : ''}

              <a
                href={entry.wikiLink}
                target='_blank'
                rel='noopener noreferrer'
                className='link wikiLink'>
                wiki
              </a>
              <a
                href={entry.photoUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='link photoLink'>
                photos
              </a>
              <div
                className='removeEntry'
                onClick={() => {
                  setToRemove(entry.name);
                  setShowConfirm(true);
                }}>
                +
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyLog;
