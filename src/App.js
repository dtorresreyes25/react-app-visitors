import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Chart } from "react-chartjs-2";
import { ThemeProvider } from "@material-ui/styles";
import validate from "validate.js";
import { AuthProvider } from "./context/auth";
import { chartjs } from "./helpers";
import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import validators from "./common/validators";
import Routes from "./routes";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose  } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {visitsReducer} from './store'
import {createLogger} from 'redux-logger'

import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(visitsReducer, composeWithDevTools(
//   applyMiddleware(thunkMiddleware),
//   // other store enhancers if any
// ));

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};
const logger = createLogger()
const store = createStore(visitsReducer, applyMiddleware(thunkMiddleware,logger))

// const enhancers = compose(
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// );
// const store = createStore(visitsReducer, enhancers);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


//  const store = createStore(visitsReducer, /* preloadedState, */ composeEnhancers(
//     applyMiddleware(thunkMiddleware)
//   ));



export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
            <Router history={browserHistory}>
              <Routes />
            </Router>    
        </AuthProvider>
      </ThemeProvider>
      </Provider>
    );
  }
}
