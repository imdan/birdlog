import React from 'react';

const About = () => {
  return (
    <>
      <div className='aboutContainer'>
        <p>
          Bird log gets a list of birds seen in your area using gps coordinates
          from your device and allows you to save birds you've seen to a
          personal bird log.
        </p>
        <p>
          This is the first iteration so there's probably some bugs, but the
          plan is to make updates and add additional features soon, like
          accounts and permanent logs.
        </p>
        <p>
          In the meantime, feel free to send any issues, ideas, or feedback to
          dan@sup.cool.
        </p>

        <p style={{ marginTop: '25px', textAlign: 'center' }}>Happy birding.</p>
      </div>
    </>
  );
};

export default About;
