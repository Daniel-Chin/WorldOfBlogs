import moment from 'moment';

const enterMeansClick = (onClick, accept_space) => (
  (event) => {
      accept_space = accept_space === undefined ? true : accept_space;
      if (event.keyCode === 13 || (accept_space && event.keyCode === 32)) {
      event.preventDefault();
      onClick();
    } else if (event.keyCode === 27) {
      event.target.blur();
    }
  }
);

const formatTime = (time) => (
  moment().format('MMM Do YYYY, h a')
);

const is_mobile = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

export {
  enterMeansClick, 
  formatTime, 
  is_mobile
};
