// Mobile phone: user finger is at lower half of screen. 
// This component pads the top of the page so that buttons 
// are easier to reach for mobile users. 

import React from 'react';

const MobilePad = () => {
  if('ontouchstart' in window || navigator.msMaxTouchPoints > 0) {
    return (
      <div className='MobilePad'>

      </div>
    );
  }
  return (
    <>
    </>
  );
};

export default MobilePad;
