import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReduser from './Redux/redusers/rootReduser';
import { composeWithDevTools } from 'redux-devtools-extension';
import  'overlayscrollbars/overlayscrollbars.css' ;


const store = createStore(rootReduser, composeWithDevTools())
// export type RootState = ReturnType<typeof rootReduser>;
// export type AppDispatch = typeof store.dispatch;

const root = ReactDOM.createRoot(
  document.getElementById('root')
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


