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
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { visitsReducer } from "./store";
import { createLogger } from "redux-logger";
import { ToastContainerHelper } from './helpers/'

import { composeWithDevTools } from "redux-devtools-extension";

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};
const logger = createLogger();
// const store = createStore(visitsReducer, applyMiddleware(thunkMiddleware,logger))

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const store = createStore(
  visitsReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, logger))
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Router history={browserHistory}>
              <Routes />
              <ToastContainerHelper/>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}
