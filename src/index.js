import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider, useSnackbar } from 'notistack';
import App from "./components/App";
import { Provider } from 'react-redux';
import { store } from './appStore/store'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <App/>
      </SnackbarProvider>
    </Provider>
, document.getElementById("root"));

reportWebVitals();
