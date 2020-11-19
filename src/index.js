import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";
import AppThemeProvider from './themes/provider';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <AppThemeProvider>
    <CssBaseline />
    <App />
  </AppThemeProvider>,
  document.getElementById("root"));