import React from 'react';
import { Link } from 'react-router-dom';
import { InputGroup, FormControl } from 'react-bootstrap';
import CheckUsernameCard from './CheckUsernameCard';
import { enterMeansClick, is_mobile } from '../helper/misc';

const CredentialsCard = ({ 
  title, fetch_state, onEnter, available, otherwise, 
  onUsernameChange, onPasswordChange, onUsernameBlur,
  button_class, button_configs, 
}) => {
  const effective_button_configs = button_configs || [
    { name: 'Username', type: 'text' }, 
    { name: 'Password', type: 'password' }, 
  ];
  const buttons = effective_button_configs.map((x) => (x.name));
  const button_type = effective_button_configs.map((x) => (x.type));
  return (
    <div className={'centerAlign credentialsCard' + (
      is_mobile ? 'Mobile' : ''
    )}>
      <h2>{title}</h2>
      <InputGroup className='mt-3'>
        <InputGroup.Prepend>
          <InputGroup.Text id={buttons[0]}>{buttons[0]}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type={button_type[0]}
          aria-label={buttons[0]}
          aria-describedby={buttons[0]}
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
          <InputGroup.Text id={buttons[1]}>{buttons[1]}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type={button_type[1]}
          aria-label={buttons[1]}
          aria-describedby={buttons[1]}
          onChange={onPasswordChange}
          onKeyUp={enterMeansClick(onEnter, false)}
        />
      </InputGroup>
      {fetch_state === 'none' ? 
        <div 
          className={'button mt-3 ' + button_class} tabIndex={0}
          onClick={onEnter} onKeyUp={enterMeansClick(onEnter)}
        >
          {title}
        </div>
      :
        <p className='mt-3'>
          Loading...
        </p>
      }
      {otherwise &&
        <p className='mb-0'>
          Otherwise,{' '}
          <Link to={otherwise.to}>
            {otherwise.text}
          </Link>
        </p>
      }
    </div>
  );
};

export default CredentialsCard;
