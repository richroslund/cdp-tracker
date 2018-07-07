import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Container  } from 'bloomer';
import 'bulma/css/bulma.css';

ReactDOM.render( <Container><App /></Container>, document.getElementById('root'));
registerServiceWorker();
