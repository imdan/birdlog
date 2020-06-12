import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ current }) => {
  return (
    <>
      <header className='header'>
        <Link to='/' className='iconLink' onClick={current} value='home'>
          <img
            src='./birdlogger_icon.png'
            alt='bird logger icon'
            className='icon'
          />
        </Link>

        <Link to='/about' className='headerLink' onClick={current}>
          about
        </Link>
        <Link to='/mylog' className='headerLink' onClick={current}>
          mylog
        </Link>
      </header>
    </>
  );
};

export default Header;
