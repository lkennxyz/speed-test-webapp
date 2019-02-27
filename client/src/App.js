import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
// import logo from './logo.svg';
import Side from './components/Side';
import Today from './components/Today';
import SelectedDate from './components/Date';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;
const Body = styled.div`
  height: 100vh;
  width: 80%;
  background-color: #FFF;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppContainer>
            <Helmet><title>Speed Test</title></Helmet>
            <Side />
            <Body>
              <Route path="/today" component={Today} />
              <Route path="/date" component={SelectedDate} />
            </Body>
          </AppContainer>
        </header>
      </div>
    );
  }
}

export default App;
