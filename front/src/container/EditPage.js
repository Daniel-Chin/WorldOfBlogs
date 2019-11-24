import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import EditPageHeader from '../component/EditPageHeader';
import MobilePad from '../component/MobilePad';
import { enterMeansClick } from '../helper/misc';
import { GET, POST } from '../helper/api';
import FloatIn from '../component/FloatIn';

const SAVE_SHOW_MENU_TIME = 2000;
const HEADER_TRANSITION = '.5s';
const HEADER_HEIGHT = '40px';

const EditPage = ({ unAuth }) => {
  const mine_index = useParams().mine_index;

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [menu_visible, setMenu_visible] = useState(true);
  const [save_stage, setSave_stage] = useState('saved');
  const [response, setResponse] = useState(null);
  const [error_msg, setError_msg] = useState(null);
  const [delete_stage, setDelete_stage] = useState('none');

  useEffect(() => {
    if (title === null) {
      GET('getMine', { params: {
        mine_index, 
      } }, unAuth).then((res) => {
        setTitle(res.title);
        setContent(res.content);
      });
    }
  }, [title, setTitle, setContent, unAuth, mine_index]);

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
    onChange();
  };
  const onContentChange = (event) => {
    setContent(event.target.value);
    onChange();
  };
  const onChange = function () {
    if (save_stage !== 'unsaved') {
      setSave_stage('unsaved');
    }
  };
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
      POST('editBlog', {
        title, 
        content, 
        mine_index,
      }, unAuth).then((res) => {
        setResponse(res);
        if (show_menu) {
          setTimeout(() => {
            setMenu_visible(false);
          }, SAVE_SHOW_MENU_TIME);
        }
      });
    }
  };

  const deleteBlog = function () {
    setDelete_stage('deleting');
    GET('delBlog', { params: {
      mine_index, 
    } }, unAuth).then(() => {
      setDelete_stage('deleted');
    });
  };

  const closeModal = function () {
    setError_msg(null);
  };

  if (delete_stage !== 'none') {
    return (
      <div className='centerAlign mt-5'>
        <MobilePad />
        {delete_stage === 'deleting' ?
          <FloatIn show>
            <p>Deleting the blog...</p>
            <p>
              This may take a while. 
              We are erasing your traces from the entire database. 
            </p>
          </FloatIn>
        :
          <>
            <p>
              Successfully deleted. 
            </p>
            <Link to='/view'>
              <div
                className='button blueButton' tabIndex={0}
              >
                OK
              </div>
            </Link>
          </>
        }
      </div>
    );
  }

  if (title === null || content === null) {
    return (
      <div className='mt-5 centerAlign'>
        <MobilePad />
        <FloatIn show>
          Downloading your blog...
        </FloatIn>
      </div>
    );
  }

  return (
    <div className='EditPage' onKeyDown={onKeyDown}>
      <Modal
        isOpen={error_msg !== null}
        onRequestClose={closeModal}
        style={{
          content: {
            padding: 0, 
            borderRadius: '10px',
            textAlign: 'center',
          }, 
        }}
        contentLabel="Error Modal"
      >
        <h3 className='errorModalHead'>Failed to Save</h3>
        <div className='pad1020'>
          <p>
            {error_msg}
          </p>
          <div 
            className='button grayButton' tabIndex={0}
            onClick={closeModal} onKeyUp={enterMeansClick(closeModal)}
          >
            OK
          </div>
        </div>
      </Modal>
      <div className='editPageHeader' style={{
        transition: HEADER_TRANSITION, 
        transform: `translate(0, ${menu_visible ? 0 : '-100%'})`, 
        position: 'absolute',
        height: HEADER_HEIGHT, 
      }}>
        <EditPageHeader 
          save_stage={save_stage} save={save} 
          mine_index={mine_index} title={title} 
          content={content} setMenu_visible={setMenu_visible}
          deleteBlog={deleteBlog}
        />
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
