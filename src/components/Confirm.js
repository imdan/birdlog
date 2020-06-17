import React from 'react';

const Confirm = ({ clearLog, hideModal, toRemove, removeEntry }) => {
  return (
    <div className='modalContainer'>
      <div className='confirmModal'>
        <p>remove {toRemove}?</p>
        {toRemove === 'all birds' ? (
          <button onClick={clearLog} className='modalButton'>
            yeah
          </button>
        ) : (
          <button
            onClick={() => {
              console.log('removed', toRemove);
              removeEntry(toRemove);
              hideModal();
            }}
            className='modalButton'>
            yeah
          </button>
        )}
        <button onClick={hideModal} className='modalButton'>
          nah
        </button>
      </div>
    </div>
  );
};

export default Confirm;
