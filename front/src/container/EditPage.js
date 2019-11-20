import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { enterMeansClick } from '../helper/misc';

const HEADER_TRANSITION = '.5s';
const HEADER_HEIGHT = '40px';

const EditPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [menu_visible, setMenu_visible] = useState(true);

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  }
  const onContentChange = (event) => {
    setContent(event.target.value);
  }

  const toggleMenu = function () {
    setMenu_visible(! menu_visible);
  };

  return (
    <div className='EditPage'>
      <div className='editPageHeader' style={{
        transition: HEADER_TRANSITION, 
        transform: `translate(0, ${menu_visible ? 0 : '-100%'})`, 
        position: 'absolute',
        height: HEADER_HEIGHT, 
      }}>
        lol
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
