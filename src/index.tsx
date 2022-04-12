import React from 'react'
import { render } from 'react-dom'

import App from './App'
import GlobalStyle from './GlobalStyle'

import './style.pcss'

render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root')
)
