import React from "react";
import ReactDOM from "react-dom";
import App from "./src/app.js";
import AppThemeProvider from './src/themes/provider';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <AppThemeProvider>
    <CssBaseline />
    <App />
  </AppThemeProvider>,
  document.getElementById("root"));