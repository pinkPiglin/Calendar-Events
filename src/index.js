import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {HashRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import rootReduser from './Redux/redusers/rootReduser';
import { composeWithDevTools } from 'redux-devtools-extension';
import  'overlayscrollbars/overlayscrollbars.css';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';


const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));
// export type RootState = ReturnType<typeof rootReduser>;
// export type AppDispatch = typeof store.dispatch;

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <HashRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </HashRouter>
  </React.StrictMode>
);


