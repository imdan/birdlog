import React from 'react';
import ToTop from './ToTop';

const Utils = ({ handleClick, more, search, toTop, length }) => {
  if (!more) {
    return (
      <div className='container'>
        <ToTop toTop={toTop} />
      </div>
    );
  }

  if (search && length < 4) {
    return <div className='container'></div>;
  }

  if (search && length >= 4) {
    return (
      <div className='container'>
        <ToTop toTop={toTop} />
      </div>
    );
  }

  return (
    <div className='container'>
      <p onClick={handleClick} className='showMore'>
        show more...
      </p>
      <ToTop toTop={toTop} />
    </div>
  );
};

export default Utils;
