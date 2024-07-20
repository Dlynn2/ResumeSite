import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ToggleColorMode from './App'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToggleColorMode />
  </React.StrictMode>,
)

// "scripts": {
  //   "prestart": "node aspnetcore-https && node aspnetcore-react",
  //   "start": "rimraf ./build && react-scripts start",
  //   "build": "react-scripts build",
  //   "test": "cross-env CI=true react-scripts test --env=jsdom",
  //   "eject": "react-scripts eject",
  //   "lint": "eslint ./src/"
  // },S