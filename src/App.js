import React, { Component } from 'react';
import random from './random.png';
import { Button } from 'reactstrap';
import './App.css';

const people = [
  {name: 'Sam', checked: false},
  {name: 'Doug', checked: false},
  {name: 'Ben', checked: false},
  {name: 'Dana', checked: false},
  {name: 'Chris', checked: false}
];

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: people,
      random: null,
      quote: null,
      fact: null,
      date: new Date()
    };

    this.getQuote();
    this.getFact();
  };

  getQuote = () => {
    fetch('https://favqs.com/api/qotd').then(res => res.json()).then(res => {
       this.setState({
         quote: res.quote
       });
    });
  }

  getFact = () => {
    const d = this.state.date;
    fetch(`http://numbersapi.com/${d.getMonth() + 1}/${d.getDate()}/date`).then(res => res.text()).then(res => {
      this.setState({
        fact: res
      });
   });
  }

  toggleCheck = e => {
    const index = this.state.people.findIndex(p => p.name === e.target.name);
    const people = this.state.people;
    people[index].checked = !people[index].checked;
    this.setState({
      people: people
    });
  };

  selectAll = () => {
    const allChecked = this.state.people.map(person => {
      return {
        name: person.name,
        checked: true
      }
    });

    this.setState({
      people: allChecked
    });
  };

  deselectAll = () => {
    const notChecked = this.state.people.map(person => {
      return {
        name: person.name,
        checked: false
      }
    });

    this.setState({
      people: notChecked
    });
  };

  allSelected = () => {
    return this.state.people.every(person => person.checked);
  };

  getChecked = () => {
    return this.state.people.filter(person => person.checked);
  }

  generateRandom = () => {
    const randoms = [];

    this.getChecked().forEach(person => {
      randoms.push(person.name);
    });

    this.setState({
      random: shuffleArray(randoms)
    });
  };

  renderRandom = () => {
    return this.state.random.map((person, index) => {
      return (
        <p key={index} className="random-name">
          {index + 1}. {person}
        </p>
      );
    });
  };

  renderPeople = () => {
    return this.state.people.map(({name, checked}) => {
      return (
        <div key={name} className="person">
          <Button onClick={this.toggleCheck} name={name} outline={!checked} color="primary">
            {name}
          </Button>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={random} className="App-logo" alt="logo" />
        </header>
        {this.state.quote ? 
          <div className="wraptext">
            {this.state.quote.body} - {this.state.quote.author}
            <hr/>
          </div>
          : null
        }
        {this.state.fact ? 
          <div className="wraptext">
            {this.state.fact}
            <hr/>
          </div>
          : null
        }
        <div className="people">
          {this.renderPeople()}
        </div>
        {this.allSelected() ?
          <Button className="all" outline color="danger" onClick={this.deselectAll}>
            Deselect all
          </Button>
          :
          <Button className="all" outline color="secondary" onClick={this.selectAll}>
            Select all
          </Button>
        }
        <div className="generate">
          <Button color="success" onClick={this.generateRandom}>
            Randomize
          </Button>
        </div>
        <div className="random">	
          {this.state.random && this.renderRandom()}	
        </div>
        <img alt="bill" src="https://belikebill.ga/billgen-API.php?default=1" />
      </div>
    );
  }
}

export default App;
