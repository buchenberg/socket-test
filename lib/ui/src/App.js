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
      response: false
    };
  }

  componentDidMount() {   
    socket.on("Yo", data => {
      console.log('Got a yo from socket.io')
      this.setState({ response: 'Yo!' });
    });
    socket.on("Excuse you!", data => {
      console.log('Excuse you from socket.io')
      this.setState({ response: 'Excuse you!' });
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    socket.emit("burp");
  }



  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Card style={style}>

            <CardTitle title="Socket.io Test" />
            <CardText>
              Socket.io connection response: {this.state.response}
            </CardText>
            <CardActions>
              <FlatButton label="Action1" />
              <FlatButton label="Action2" onClick={this.handleClick}/>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
