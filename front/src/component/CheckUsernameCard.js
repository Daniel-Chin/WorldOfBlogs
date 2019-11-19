import React from 'react';

const CheckUsernameCard = ({ x }) => {
  const text = {
    'ok': 'This username is available. ', 
    'collide': 'Already taken. Please change. ',
    'none': '.', 
  }[x];
  return (
    <div className='CheckUsernameCard' style={{
      backgroundColor: {
        'ok': '#090', 
        'collide': '#a00', 
        'none': 'white', 
      }[x],
      userSelect: x === 'none' ? 'none' : 'auto', 
    }}>
      {text}
    </div>
  );
};

export default CheckUsernameCard;
