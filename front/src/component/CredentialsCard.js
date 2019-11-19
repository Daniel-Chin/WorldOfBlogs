import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import CheckUsernameCard from './CheckUsernameCard';
import { enterMeansClick } from '../helper/misc';

const CredentialsCard = ({ 
  title, fetch_state, onEnter, available, 
  onUsernameChange, onPasswordChange, onUsernameBlur,
}) => {
  return (
    <div className='credentialsCard centerAlign'>
      <h2>{title}</h2>
      <InputGroup className='mt-3'>
        <InputGroup.Prepend>
          <InputGroup.Text id="username_field">Username</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Username"
          aria-describedby="username_field"
          onBlur={onUsernameBlur}
          onChange={onUsernameChange}
          onKeyUp={enterMeansClick(onEnter, false)}
        />
      </InputGroup>
      {available &&
        <CheckUsernameCard x={available} />
      }
      <InputGroup className='mt-3'>
        <InputGroup.Prepend>
          <InputGroup.Text id="password_field">Password</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type='password'
          aria-label="Password"
          aria-describedby="password_field"
          onChange={onPasswordChange}
          onKeyUp={enterMeansClick(onEnter, false)}
        />
      </InputGroup>
      {fetch_state === 'none' ? 
        <div 
          className='button greenButton mt-3' tabIndex={0}
          onClick={onEnter} onKeyUp={enterMeansClick(onEnter)}
        >
          {title}
        </div>
      :
        'Loading...'
      }
    </div>
  );
};

export default CredentialsCard;
