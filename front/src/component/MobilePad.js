// Mobile phone: user finger is at lower half of screen. 
// This component pads the top of the page so that buttons 
// are easier to reach for mobile users. 

import React from 'react';
import { is_mobile } from '../helper/misc';

const MobilePad = () => {
  if(is_mobile) {
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
