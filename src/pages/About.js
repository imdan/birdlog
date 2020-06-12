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
          This is the first iteration so there might be some bugs, but the plan
          is to make updates and add additional features soon, like accounts and
          permanent logs.
        </p>
        <p>
          In the meantime, any issues, feature requests, or feedback would be
          much appreciated and can be sent to dan@sup.cool with bird log in the
          subject line.
        </p>

        <p style={{ marginTop: '25px' }}>Happy birding.</p>
      </div>
    </>
  );
};

export default About;
