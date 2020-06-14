import React from 'react';

const Confirm = ({ clearLog, hideModal, toRemove, removeEntry }) => {
  return (
    <div className='modalContainer'>
      <div className='confirmModal'>
        <p>are you sure?</p>
        {toRemove === 'all' ? (
          <button onClick={clearLog} className='modalButton'>
            yeah
          </button>
        ) : (
          <button
            onClick={() => {
              console.log(toRemove);
              removeEntry(toRemove);
              hideModal();
            }}
            className='modalButton'>
            yes
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
