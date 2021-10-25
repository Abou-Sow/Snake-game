
/// FICHIER INITIAL INDEX QUI VA APPELER APP.JS



// APPEL DES BIBLIOTHEQUES INDISPENSABLES


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';   // UTILISATION DUN SERVICE WORKER

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
