import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { InputGroup, FormControl } from 'react-bootstrap';
import Modal from 'react-modal';
import Hat from '../component/Hat';
import CheckUsernameCard from '../component/CheckUsernameCard';
import { GET, login } from '../helper/api';
import { enterMeansClick } from '../helper/misc';

const RegisterPage = ({ whoami, unAuth, setWhoami }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [username_to_check, setUsername_to_check] = useState('');
  const [available, setAvailable] = useState('none');
  const [register_state, setRegister_state] = useState('none');
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
  }, [username_to_check, setAvailable]);

  if (whoami !== null && register_state === 'none') {
    // Already logged in.
    return <Redirect to='/dashboard' />
  }

  if (register_state === 'ok') {
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
    setRegister_state('waiting');
    const options = { params: { username, password } };
    GET('user/register', options).then(
      (res) => {
        if (res.is_ok) {
          login(options.params, setWhoami).then((_) => {
            setRegister_state('ok');
            setPassword('');  // Don't let user password hang around in RAM
          });
        } else {
          setRegister_state('none');
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
      <div className='RegisterCard centerAlign'>
        <h2>Sign Up</h2>
        <InputGroup className='mt-3'>
          <InputGroup.Prepend>
            <InputGroup.Text id="username_field">Username</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Username"
            aria-describedby="username_field"
            onBlur={onUsernameBlur}
            onChange={onUsernameChange}
            onKeyUp={enterMeansClick(onRegister, false)}
          />
        </InputGroup>
        <CheckUsernameCard x={available} />
        <InputGroup className='mt-3'>
          <InputGroup.Prepend>
            <InputGroup.Text id="password_field">Password</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type='password'
            aria-label="Password"
            aria-describedby="password_field"
            onChange={onPasswordChange}
            onKeyUp={enterMeansClick(onRegister, false)}
          />
        </InputGroup>
        {register_state === 'none' ? 
          <div 
            className='button greenButton mt-3' tabIndex={0}
            onClick={onRegister} onKeyUp={enterMeansClick(onRegister)}
          >
            Sign Up
          </div>
        :
          'Loading...'
        }
      </div>
    </div>
  );
};

export default RegisterPage;
