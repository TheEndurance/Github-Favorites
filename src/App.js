import React, { Component } from 'react';
import logo from './logo.svg';
import Styles from './App.css';
import FavoritesDashboard from './Components/FavoritesDashboard';

class App extends Component {
  render() {
    return (
      <div className={Styles.app}>
        <FavoritesDashboard />
      </div>
    );
  }
}

export default App;
