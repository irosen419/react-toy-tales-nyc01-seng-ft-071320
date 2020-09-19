import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'


class App extends React.Component {

  state = {
    display: false,
    toyArray: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }
  componentDidMount() {
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(toys => this.setState(() => ({ toyArray: toys })))
  }

  appSubmitHandler = (toy) => {
    const options = {
      method: 'POST',
      headers: {
        "content-type": "application-json",
        Accept: "application-json"
      },
      body: JSON.stringify(toy)
    }

    fetch('http://localhost:3000/toys/', options)
      .then(resp => resp.json())
      .then(this.setState((toyObj) => ({ toyArray: [toyObj, ...this.state.toyArray] })))
  }

  appDonateHandler = (id) => {
    fetch('http://localhost:3000/toys/' + `${id}`, { method: 'DELETE' })

    let toy = this.state.toyArray.find(toy => toy.id === id)
    let newArray = this.state.toyArray
    newArray.splice(newArray.indexOf(toy), 1)
    this.setState({ toyArray: newArray })
  }

  appLikeHandler = (toy) => {
    toy.likes++
    console.log(toy.likes)
    const options = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ likes: toy.likes })
    }

    fetch('http://localhost:3000/toys/' + `${toy.id}`, options)
      .then(resp => resp.json())
      .then(toyObj => {
        let newArray = this.state.toyArray
        let foundToy = newArray.find(el => el.id === toy.id)
        newArray[newArray.indexOf(foundToy)] = toyObj
        this.setState(() => ({ toyArray: newArray }))
      })
  }



  render() {
    return (
      <>
        <Header />
        { this.state.display
          ?
          <ToyForm appSubmitHandler={this.appSubmitHandler} />
          :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toyArray} appDonateHandler={this.appDonateHandler} appLikeHandler={this.appLikeHandler} />
      </>
    );
  }

}

export default App;
