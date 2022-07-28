import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    
    return (
      <div className="App">
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

      <ul className="icon-bar">
        <li>
          <a href="https://www.facebook.com/dylan.lynn.56" className="facebook" id="facebook"><i className="fa fa-facebook"></i></a>
          <UncontrolledTooltip placement="right" target="facebook">
            Facebook
          </UncontrolledTooltip>
        </li>
        <li>
          <a href="https://github.com/Dlynn2" className="github" id="github"><i className="fa fa-github"></i></a>
          <UncontrolledTooltip placement="right" target="github">
            Github
          </UncontrolledTooltip>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/dylan-lynn-47b76965/" className="google" id="email"><i className="fa fa-envelope"></i></a>
          <UncontrolledTooltip placement="right" target="email">
            Email me!
          </UncontrolledTooltip>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/dylan-lynn-47b76965/" className="linkedin" id="linkedIn"><i className="fa fa-linkedin"></i></a>
          <UncontrolledTooltip placement="right" target="linkedIn">
            LinkedIn
          </UncontrolledTooltip>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/dylan-lynn-47b76965/" className="resume"  id="resume"><i className="fa fa-file-pdf-o"></i></a>
          <UncontrolledTooltip placement="right" target="resume">
            Download my resume.
          </UncontrolledTooltip>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/dylan-lynn-47b76965/" className="resume"  id="resume"><i className="fa fa-file-pdf-o"></i></a>
          <UncontrolledTooltip placement="right" target="resume">
            Download my resume.
          </UncontrolledTooltip>
        </li>
      </ul>
    </div>
    );
  }
}
