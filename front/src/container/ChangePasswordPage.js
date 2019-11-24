import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import Hat from '../component/Hat';
import CredentialsCard from '../component/CredentialsCard';
import { GET, login } from '../helper/api';
import { enterMeansClick } from '../helper/misc';
import FloatIn from '../component/FloatIn';
import MobilePad from '../component/MobilePad';

const ChangePasswordPage = ({ whoami, unAuth }) => {
  const [old, setOld] = useState('');
  const [password, setPassword] = useState('');
  const [fetch_state, setFetch_state] = useState('none');
  const [error_msg, setError_msg] = useState(null);

  if (fetch_state === 'ok') {
    return <Redirect to='/Me' />
  }

  const onOldChange = (event) => {
    setOld(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = function() {
    setFetch_state('waiting');
    let is_sub = true;
    GET('user/changePassword', { params: {
      old_password: old, 
      new_password: password, 
    } }, unAuth).then(
      (res) => {
        if (res && res.is_ok) {
          // login to refresh token to log hackers out 
          login({
            username: whoami, 
            password, 
          }, ()=>{}).then((_) => {
            if (is_sub) {
              setFetch_state('ok');
              setPassword('');  // Don't let user password hang around in RAM
              setOld('');
            }
          });
        } else {
          if (is_sub && res) {
            setFetch_state('none');
            setError_msg(res.message);
          }
        }
      }
    );
    return () => {
      is_sub = false;
    };
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
        <h3 className='errorModalHead'>Failed to Change Password</h3>
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
      <Hat whoami={whoami} />
      <MobilePad />
      <FloatIn show>
        <CredentialsCard 
          title='Change Password' fetch_state={fetch_state} 
          onEnter={onSubmit} button_class='grayButton'
          onUsernameChange={onOldChange}
          onPasswordChange={onPasswordChange}
          button_configs={[
            { name: 'Old Password', type: 'password' }, 
            { name: 'New Password', type: 'password' }, 
          ]}
        />
      </FloatIn>
    </div>
  );
};

export default ChangePasswordPage;
