import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ReadTimeHUD from './ReadTimeHUD';
import { enterMeansClick, is_mobile } from '../helper/misc';
import FloatIn from './FloatIn';

const SAVE_CAPTION = is_mobile ? 'Save' : 'Save (⌘Command + S)';

const EditPageHeader = ({
  save_stage, save, mine_index, title, content, 
  setMenu_visible, 
}) => {
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

  return (
    <div>
      <div className='EditPageHeaderLeft'>
        <div className='floatLeft'>
          <FloatIn show={save_stage === 'saved_popup'}>
            <span className='mr-2'>
              Saved
            </span>
          </FloatIn>
        </div>
        <div className='floatLeft'>
          <FloatIn show={save_stage === 'saving'}>
            <span>
              Saving...
            </span>
          </FloatIn>
        </div>
        <div className='floatLeft'>
          <FloatIn show={save_stage === 'unsaved'}>
            <div
              className='button blueButton smallButton' tabIndex={0}
              onClick={save} onKeyUp={enterMeansClick(save)}
            >
              {SAVE_CAPTION}
            </div>
            <div
              className='button redButton smallButton ml-2' tabIndex={0}
              onClick={discard} onKeyUp={enterMeansClick(discard)}
              onBlur={() => {setConfirm_discard(false)}}
              style={confirm_discard ? {
                position: 'relative', 
                left: '10px',
              } : {}}
            >
              {confirm_discard ? 
                (is_mobile ? 'Tap again' : 
                  'Click again to confirm'
                )
              :
                'Discard Changes'
              }
            </div>
          </FloatIn>
        </div>
        <div className='floatLeft'>
          <FloatIn show={save_stage === 'saved' || save_stage === 'saved_popup'}>
            <div
              className='button greenButton smallButton' tabIndex={0}
              onClick={leave} onKeyUp={enterMeansClick(leave)}
            >
              Finish
            </div>
          </FloatIn>
        </div>
      </div>
      <div className='floatRight'>
        <ReadTimeHUD 
          title={title} content={content} 
          setMenu_visible={setMenu_visible}
        />
      </div>
      <div className='floatClear' />
    </div>
  );
};

export default EditPageHeader;
