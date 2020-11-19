import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Normal or default theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#cc4444',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
    },
    titleBar: {
      main: '#eeeeee',
      contrastText: '#222222',
    },
  },
  custom: {
    logo: '/PRiSM-Logo-text-01-768x329.png'
  }
})

export default theme