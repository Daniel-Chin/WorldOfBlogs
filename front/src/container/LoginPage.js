import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import Hat from '../component/Hat';
import CredentialsCard from '../component/CredentialsCard';
import { login } from '../helper/api';
import { enterMeansClick } from '../helper/misc';

const LoginPage = ({ whoami, setWhoami }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fetch_state, setFetch_state] = useState('none');
  const [error_msg, setError_msg] = useState(null);

  if (whoami !== null || fetch_state === 'ok') {
    // Already logged in.
    return <Redirect to='/view' />
  }

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onLogin = function() {
    setFetch_state('waiting');
    login({ username, password }, setWhoami).then(
      ({ is_ok, message}) => {
        if (is_ok) {
          setFetch_state('ok');
          setPassword('');  // Don't let user password hang around in RAM
        } else {
          setFetch_state('none');
          setError_msg(message);
        }
      }
    );
  };

  const closeModal = function () {
    setError_msg(null);
  };

  return (
    <div>
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
        <h3 className='errorModalHead'>Failed to Sign In</h3>
        <div className='errorModalBody'>
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
      <Hat whoami={whoami} />
      <CredentialsCard 
        title='Sign In' fetch_state={fetch_state} 
        onEnter={onLogin} 
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
      />
    </div>
  );
};

export default LoginPage;
