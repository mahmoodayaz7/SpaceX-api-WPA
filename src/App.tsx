import React from 'react';
import './App.css';
import RocketListContainer from './components/Rocket List/index'
import RouteConfig from './route';
import Navigbar from './components/Navbar/Navbar'

function App() {
  return (
    <div className="App">
      <RouteConfig></RouteConfig>
    </div>
  );
}

export default App;
