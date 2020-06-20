import React from 'react';

const Footer = ({ length, focus, screen, current, logLength }) => {
  const posBottom =
    focus && screen < 425
      ? {
          position: 'fixed',
          bottom: 0,
          left: 0,
          display: 'none'
        }
      : {
          position: 'fixed',
          bottom: 0,
          left: 0
        };

  if (current === 'home' && length >= 3) {
    return (
      <>
        <footer>
          <a href='https://www.sup.cool'>
            <img src='./sup_tb.png' alt='sup logo' width='38' height='38' />
          </a>
        </footer>
      </>
    );
  }

  if (logLength > 1 && window.location.href.includes('mylog')) {
    return (
      <>
        <footer>
          <a href='https://www.sup.cool'>
            <img src='./sup_tb.png' alt='sup logo' width='38' height='38' />
          </a>
        </footer>
      </>
    );
  }

  return (
    <>
      <footer style={posBottom}>
        <a href='https://www.sup.cool'>
          <img src='./sup_tb.png' alt='sup logo' width='38' height='38' />
        </a>
      </footer>
    </>
  );
};

export default Footer;
