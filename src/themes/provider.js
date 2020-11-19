import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import light from './light'
import dark from './dark'

const themes = { light, dark }

// eslint-disable-next-line no-unused-vars
export const AppThemeContext = React.createContext(
  {
    currentTheme: 'light',
    setTheme: null,
  },
)

const AppThemeProvider = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props

  // Read current theme from localStorage
  const currentTheme = localStorage.getItem('appTheme') || 'light'

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(currentTheme)

  // Retrieve the theme object by theme name
  const theme = themes[themeName]

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (name) => {
    localStorage.setItem('appTheme', name)
    _setThemeName(name)
  }

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  }

  return (
    <AppThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  )
}

export default AppThemeProvider