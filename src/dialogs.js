import React, { Fragment } from "react";
import "./style.css";

import SettingsDialog from './settings-dialog';
import AboutDialog from './about-dialog';


const Dialogs = (props) => {
  const {showSettingsDialog, showAboutDialog} = props;
  return (
    <Fragment>
      <SettingsDialog isOpen={showSettingsDialog}/>
      <AboutDialog isOpen={showAboutDialog}/>
    </Fragment>
  );
}

export default Dialogs;