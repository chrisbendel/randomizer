import React, { Component } from 'react';
import { Weather } from './components/Weather';
import './App.css';
import {DadJoke} from "./components/DadJoke";
import {Users} from "./components/Users";

class App extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="App">
        {/*<Clock/>*/}
        <Weather/>
        <DadJoke/>
        <Users/>
      </div>
    );
  }
}

export default App;
