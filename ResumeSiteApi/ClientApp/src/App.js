import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import IconBar from './components/IconBar/IconBar';
import { Layout } from './components/Layout.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/custom.css';

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {
      darkMode: true,
    };
  }

  toggleDarkMode = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  };
  
  render() {
    const { darkMode } = this.state;
    return (
      <>
        <div  className={'App ' + darkMode ? 'dark-mode' : 'light-mode'}>
          <Layout  toggleDarkMode={this.toggleDarkMode} darkMode={darkMode}>
            <Routes>
              {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
              })}
            </Routes>
          </Layout>
          {/* Place IconBar and ToastContainer within the Layout component */}
          <IconBar />
          <ToastContainer />
        </div>
      </>
    );
  }
}
