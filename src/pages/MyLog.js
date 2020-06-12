import React from 'react';

const MyLog = ({ clearLog }) => {
  const entries = JSON.parse(localStorage.getItem('mylog'));
  // console.log(entries);
  const note =
    "Please note: Logs are being stored in your browser's local storage. Future updates will resolve this, but for now logs are not permanent and may be lost depending on browser settings.";

  if (entries === null) {
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
        <div onClick={clearLog} className='clearLog'>
          clear log
        </div>
        {entries.reverse().map(entry => {
          return (
            <div className='bird' key={entry.name}>
              <h2>{entry.name}</h2>
              <h4>{entry.sciName}</h4>
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyLog;
