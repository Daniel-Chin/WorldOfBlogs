import React, { useState, useEffect } from 'react';
import EditPageHeader from '../component/EditPageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { enterMeansClick } from '../helper/misc';

const SAVE_SHOW_MENU_TIME = 2000;
const HEADER_TRANSITION = '.5s';
const HEADER_HEIGHT = '40px';

const EditPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [menu_visible, setMenu_visible] = useState(true);
  const [save_stage, setSave_stage] = useState('saved');
  const [response, setResponse] = useState(null);
  const [error_msg, setError_msg] = useState(null);

  useEffect(() => {
    if (response !== null) {
      const { is_ok, message } = response;
      setResponse(null);
      if (! is_ok) {
        setSave_stage('unsaved');
        setError_msg(message);
        return;
      }
      if (save_stage === 'saving') {
        setSave_stage('saved_popup');
      }
    }
  }, [response, save_stage, setSave_stage, setMenu_visible, setResponse]);

  useEffect(() => {
    if (save_stage === 'saved_popup') {
      const timeout = setTimeout(() => {
        setSave_stage('saved');
      }, SAVE_SHOW_MENU_TIME);
      return () => {clearTimeout(timeout);};
    }
  }, [save_stage, setSave_stage]);

  const onTitleChange = (event) => {
    setTitle(event.target.value);
    if (save_stage !== 'unsaved') {
      setSave_stage('unsaved');
    }
  }
  const onContentChange = (event) => {
    setContent(event.target.value);
    if (save_stage !== 'unsaved') {
      setSave_stage('unsaved');
    }
  }
  const onKeyDown = (event) => {
    if (event.ctrlKey || event.metaKey) {
      if (event.key.toLowerCase() === 's') {
        event.preventDefault();
        save();
      }
    }
  };

  const toggleMenu = function () {
    setMenu_visible(! menu_visible);
  };

  const save = function () {
    if (save_stage === 'unsaved') {
      const show_menu = ! menu_visible;
      setSave_stage('saving');
      if (show_menu) {
        setMenu_visible(true);
      }
      setTimeout(() => {
        setResponse({is_ok:true});
        if (show_menu) {
          setTimeout(() => {
            setMenu_visible(false);
          }, SAVE_SHOW_MENU_TIME);
        }
      }, 500);
    }
  };
  
  return (
    <div className='EditPage' onKeyDown={onKeyDown}>
      <div className='editPageHeader' style={{
        transition: HEADER_TRANSITION, 
        transform: `translate(0, ${menu_visible ? 0 : '-100%'})`, 
        position: 'absolute',
        height: HEADER_HEIGHT, 
      }}>
        <EditPageHeader save_stage={save_stage} save={save} />
      </div>
      <div className='titleRow' style={{
        transition: HEADER_TRANSITION, 
        marginTop: menu_visible ? HEADER_HEIGHT : 0,
      }}>
        <input 
          type='text' autoFocus className='input titleInput'
          placeholder='Insert Title Here' value={title} 
          onChange={onTitleChange}
        />
        <div 
          className='toggleButton' onClick={toggleMenu}
          tabIndex={0} onKeyUp={enterMeansClick(toggleMenu)}
        >
          <div style={{
            transform: `scale(1, ${menu_visible ? 1 : -1})`, 
            transition: HEADER_TRANSITION, 
            fontSize: '30px',
            paddingTop:    '0px',
            paddingBottom: '4px',
            paddingLeft: '10px', 
            paddingRight: '10px', 
          }}>
            <FontAwesomeIcon icon={faChevronUp} />
          </div>
        </div>
      </div>
      <textarea 
        type='text' autoFocus className='input contentInput'
        placeholder='Write...' value={content} 
        onChange={onContentChange}
      />
    </div>
  );
};

export default EditPage;
