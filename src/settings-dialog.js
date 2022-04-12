import React, { useContext } from "react";
import { Button, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DialogComponent from './dialog-component';
import { AppThemeContext } from './themes/provider';


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  radios: {
    marginTop: 30
  }
}));

const SettingsDialog = (props) => {
  let { isOpen, handleClose } = props;
  const classes = useStyles()
  
  const { currentTheme, setTheme } = useContext(AppThemeContext)

  const handleChangeTheme = (e) => {
    setTheme(e.target.value)
  }

  return (
    <DialogComponent title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <form className={classes.form} noValidate>
        <FormControl className={classes.formControl} component="fieldset">
          <FormLabel component="legend">Choose Theme:</FormLabel>
          <RadioGroup className={classes.formControl} aria-label="theme" name="theme" value={currentTheme} onChange={handleChangeTheme}>
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>
        </FormControl>
      </form>
    </DialogComponent>
  );
}

export default SettingsDialog;