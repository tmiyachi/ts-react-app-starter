import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';

document.addEventListener('DOMContentLoaded', () => {
  const el = document.createElement('div');
  document.body.appendChild(el);
  ReactDOM.render(<Game />, el);
});
