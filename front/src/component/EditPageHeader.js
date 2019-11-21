import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { enterMeansClick } from '../helper/misc';

const SAVE_CAPTION = 'Save (⌘Command + S)';

const EditPageHeader = ({ save_stage, save }) => {
  const mine_index = useParams().mine_index;
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

  switch (save_stage) {
    case 'unsaved':
      return (
        <>
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
        </>
      );
    case 'saved':
      return (
        <>
        <div
          className='button greenButton smallButton' tabIndex={0}
          onClick={leave} onKeyUp={enterMeansClick(leave)}
        >
          Finish
        </div>
        </>
      );
    case 'saved_popup':
      return (
        <span>
          Saved
        </span>
      );
    case 'saving':
      return (
        <span>
          Saving...
        </span>
      );
    default:
      return (<div>Error #1360423786319248374</div>);
  }
};

export default EditPageHeader;
