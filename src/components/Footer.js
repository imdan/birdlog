import React from 'react';

const Footer = ({ length, focus, screen, current, logLength }) => {
  const posBottom =
    focus && screen < 425
      ? {
          position: 'absolute',
          bottom: 0,
          display: 'none'
        }
      : {
          position: 'absolute',
          bottom: 0
        };

  if (length >= 3 && current === 'home') {
    return (
      <>
        <footer>
          <a href='https://www.sup.cool'>
            <img src='./sup_tb.png' alt='sup logo' width='40' height='40' />
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
            <img src='./sup_tb.png' alt='sup logo' width='40' height='40' />
          </a>
        </footer>
      </>
    );
  }

  return (
    <>
      <footer style={posBottom}>
        <a href='https://www.sup.cool'>
          <img src='./sup_tb.png' alt='sup logo' width='40' height='40' />
        </a>
      </footer>
    </>
  );
};

export default Footer;
