import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import socketIOClient from "socket.io-client";
import './App.css';

const style = {
  margin: "1em"
}

const endpoint = "http://127.0.0.1:8000";
const socket = socketIOClient(endpoint);

class App extends Component {

  

  constructor(props) {
    super(props);
    this.state = {
      jsonResponse: '',
      number: 0
    };
  }

  componentDidMount() {   
    socket.on("Yo", data => {
      console.log('Got a yo from socket.io')
      this.setState({ response: 'Yo!' });
    });
    socket.on("tisk", data => {
      console.log('Got a tisk from socket.io')
      this.setState({ response: data });
    });
    socket.on("increase", data => {
      console.log('Increase from socket.io', data)
      this.setState({ response: data.number });
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    socket.emit("burp");
  }

  handleClick2 = (e) => {
    e.preventDefault();
    fetch('/api/slow', {
      method: 'POST'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return this.setState({ jsonResponse: responseJson });
    })
    .catch((error) => {
      console.error(error);
    });
  }



  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Card style={style}>

            <CardTitle title="Socket.io Test" />
            <CardText>
              Server emits: {this.state.response}
            </CardText>
            <CardActions>
              <FlatButton label="Burp through socket" onClick={this.handleClick}/>
              <FlatButton label="Run slow server loop" onClick={this.handleClick2}/>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
