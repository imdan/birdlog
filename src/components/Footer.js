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

  // this causes a problem when you reload on mylog and then navigate to /, the footer renders this because the birds length is > 3 and current is '', but it is still showing the find birds button cuz home is true...i should use the home state here instead of current...shoudl fix it and can get rid of all the current state functions
  if (length >= 3 && current === '') {
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
