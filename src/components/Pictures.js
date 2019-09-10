import React from 'react';

const Pictures = props => {
  const { pictures } = props;

  const takenPicturesElem = pictures.map((picture, idx) => {
    return (
      <img
        key={idx}
        src={picture}
        className='photo'
        alt='The screen capture will appear in this box.'
      />
    );
  });
  return <div className='output'>{takenPicturesElem}</div>;
};

export default Pictures;
