import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import Hat from '../component/Hat';
import CredentialsCard from '../component/CredentialsCard';
import { GET, login } from '../helper/api';
import { enterMeansClick } from '../helper/misc';

const RegisterPage = ({ whoami, unAuth, setWhoami }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [username_to_check, setUsername_to_check] = useState('');
  const [available, setAvailable] = useState('none');
  const [fetch_state, setFetch_state] = useState('none');
  const [error_msg, setError_msg] = useState(null);

  useEffect(() => {
    if (username_to_check) {
      setAvailable('none');
      GET('user/checkUsername', { params: {
        username: username_to_check
      } }, unAuth).then(
        (res) => {
          if (res) {
            setAvailable('ok');
          } else {
            setAvailable('collide');
          }
        }
      );
    }
  }, [username_to_check, setAvailable, unAuth]);

  if (whoami !== null || fetch_state === 'ok') {
    // Already logged in.
    return <Redirect to='/view' />
  }

  const onUsernameBlur = (event) => {
    setUsername_to_check(event.target.value);
  };

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
    setAvailable('none');
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onRegister = () => {
    setFetch_state('waiting');
    const options = { params: { username, password } };
    GET('user/register', options).then(
      (res) => {
        if (res.is_ok) {
          login(options.params, setWhoami).then((_) => {
            setFetch_state('ok');
            setPassword('');  // Don't let user password hang around in RAM
          });
        } else {
          setFetch_state('none');
          setError_msg(res.message);
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
        <h3 className='errorModalHead'>Failed to Sign Up</h3>
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
        title='Sign Up' fetch_state={fetch_state} 
        onEnter={onRegister} available={available}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
        onUsernameBlur={onUsernameBlur}
        otherwise={{ to: '/login', text: 'Sign in' }}
        button_class='blueButton'
      />
    </div>
  );
};

export default RegisterPage;
