import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Dark theme
const theme = createMuiTheme({
  overrides:{
    MuiSlider: {
      thumb:{
        color: 'rgb(81, 91, 95)', //'rgb(200, 147, 89)',
      },
      track: {
        color: 'rgb(81, 91, 95)'
      },
      rail: {
        color: 'black'
      }
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#26292C',
      light: 'rgb(81, 91, 95)',
      dark: 'rgb(26, 35, 39)',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFB74D',
      light: 'rgb(255, 197, 112)',
      dark: 'rgb(200, 147, 89)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    titleBar: {
      main: '#555555',
      contrastText: '#ffffff',
    },
    error: {
      main: red.A400,
    },
  },
  custom: {
    logo: 'PRiSM-Logo-text-01-768x329-INVERT.png'
  }
})

export default theme