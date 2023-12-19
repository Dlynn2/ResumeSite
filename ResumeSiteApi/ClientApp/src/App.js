import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import IconBar from './components/IconBar/IconBar';
import { Layout } from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <head>
          {/* Move the Font Awesome CSS link to the head */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        </head>
        <div className="App">
          <Layout>
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
