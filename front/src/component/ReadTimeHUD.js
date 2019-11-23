import React, { useState } from 'react';
import { is_mobile } from '../helper/misc';
const { MAX_READ_TIME, estimateReadTime } = require('../helper/blogUtils');

const WAIT_TIME = 1000;

const ReadTimeHUD = ({ title, content, last_change }) => {
  const [busy, setBusy] = useState(false);
  const [is_changed, setIs_changed] = useState(true);
  const [read_time, setRead_time] = useState(null);

  // if (is_changed) {
  //   return (
  //     <>
  //     </>
  //   );
  // }

  // if (busy) {
  //   return (
  //     is_mobile ? 'Computing...' : 'Estimating read time...'
  //   );
  // }

  // const over_time = read_time >= MAX_READ_TIME;
  // const style = {
    
  // };

  return (
    <div style={{
      color: '#d00', 
      marginTop: '2px',
      backgroundColor: 'white',
      padding: '0 12px', 
    }}>
      Estimated read time:{' '}
      {formatReadTime(read_time)}
    </div>
  );
};

const formatReadTime = (read_time) => {
  return 66666
};

export default ReadTimeHUD;
