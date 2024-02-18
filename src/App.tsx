import React from 'react'
import { ThemeProvider } from 'styled-components'

import Applicants from 'modules/Applicants'
import GlobalStyle from 'styles/GlobalStyle'
import { theme } from 'styles/theme'

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Applicants />
  </ThemeProvider>
)

export default App
