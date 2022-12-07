import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReduser from './Redux/redusers/rootReduser';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(rootReduser, composeWithDevTools())

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


