import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import Layout from './Layout';
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import i18n from './utils/i18n';
import 'nprogress/nprogress.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import "yet-another-react-lightbox/styles.css";
import 'react-photo-view/dist/react-photo-view.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    
  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
