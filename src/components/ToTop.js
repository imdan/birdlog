import React from 'react';

const ToTop = () => {
  const toTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };


  return (
    <div className='toTop' onClick={toTop}>
      <i className='fas fa-arrow-up'></i>
    </div>
  );
};

export default ToTop;
