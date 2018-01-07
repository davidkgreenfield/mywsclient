import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = {};

class App extends Component {

  constructor(props){
      super(props)
      this.connect = this.connect.bind(this);
      this.send = this.send.bind(this);
  }


  connect(){
      let socket = new SockJS("http://localhost:8080/sm-websocket");
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
          console.log('Connected: ' + frame);
          stompClient.subscribe('/user/queue/prequalComplete', function (greeting) {
              console.log("this is the response " + greeting.body);
          });
      });
  }


  send(){
      let req_id = Date.now() + Math.random() + "org-id";
      stompClient.send("/app/prequalStarted",{},req_id);
  }

  render() {
    this.connect();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To send a message click <span onClick={this.send}>here</span>
        </p>
      </div>
    );
  }
}

export default App;
