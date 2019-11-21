import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { enterMeansClick } from '../helper/misc';
import FloatIn from './FloatIn';

const SAVE_CAPTION = 'Save (⌘Command + S)';

const EditPageHeader = ({ save_stage, save, mine_index }) => {
  const [did_leave, setDid_leave] = useState(false);
  const [confirm_discard, setConfirm_discard] = useState(false);

  const discard = function () {
    if (confirm_discard) {
      leave();
    } else {
      setConfirm_discard(true);
    }
  };
  const leave = function () {
    setDid_leave(true);
  }

  if (did_leave) {
    return <Redirect to={`/mine/${mine_index}`} />
  }

  return (<div className='EditPageHeaderLeft'>
    <FloatIn show={save_stage === 'saved_popup'}>
      <span className='mr-2'>
        Saved
      </span>
    </FloatIn>
    <FloatIn show={save_stage === 'saving'}>
      <span>
        Saving...
      </span>
    </FloatIn>
    <FloatIn show={save_stage === 'unsaved'}>
      <div
        className='button blueButton smallButton' tabIndex={0}
        onClick={save} onKeyUp={enterMeansClick(save)}
      >
        {SAVE_CAPTION}
      </div>
      <div
        className='button redButton smallButton ml-3' tabIndex={0}
        onClick={discard} onKeyUp={enterMeansClick(discard)}
        onBlur={() => {setConfirm_discard(false)}}
      >
        {confirm_discard ? 
          'Click again to confirm'
        :
          'Discard Changes'
        }
      </div>
    </FloatIn>
    <FloatIn show={save_stage === 'saved' || save_stage === 'saved_popup'}>
      <div
        className='button greenButton smallButton' tabIndex={0}
        onClick={leave} onKeyUp={enterMeansClick(leave)}
      >
        Finish
      </div>
    </FloatIn>
  </div>);
};

export default EditPageHeader;
