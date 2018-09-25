import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from '../RoomList/RoomList';

let config = {
    apiKey: "AIzaSyAqJq16O5eokM0VqXOhoBQY4nUgPFZCRYs",
    authDomain: "bloc-chat-react-18d61.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-18d61.firebaseio.com",
    projectId: "bloc-chat-react-18d61",
    storageBucket: "bloc-chat-react-18d61.appspot.com",
    messagingSenderId: "954201445966"
};
firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRoom: ''
        };
        this.handleRoomClick = this.handleRoomClick.bind(this);
    }

    handleRoomClick(event) {
        this.setState({activeRoom: event.target.id});
    }

    render() {
        return (
          <div className="App">
              <RoomList firebase={firebase} activeRoom={this.state.activeRoom} handleRoomClick={this.handleRoomClick}/>
          </div>
        );
  }
}

export default App;
