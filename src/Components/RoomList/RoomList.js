import React, { Component } from 'react';
import MessageList from '../MessageList/MessageList';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({rooms: this.state.rooms.concat(room)});
        });
    }

    createRoom(newRoomName) {
        this.roomsRef.push({name: newRoomName});
    }

    handleButtonClick(event) {
        event.preventDefault(); // prevent submit on click
        this.createRoom(event.target.parentNode.firstChild.value); // pass value of text box to createRoom()
        event.target.parentNode.firstChild.value = ''; // reset text box text
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.rooms.map(room => {
                        return room.key === this.props.activeRoom ?
                            <li key={room.key} onClick={this.props.handleRoomClick} className='active-room' id={room.key}>{room.name}</li> :
                            <li key={room.key} onClick={this.props.handleRoomClick} id={room.key}>{room.name}</li>
                    })}
                </ul>
                <form>
                    <input type="text" placeholder="Add a new chat room.."/>
                    <button onClick={this.handleButtonClick}>Submit</button>
                </form>
                <MessageList firebase={this.props.firebase} activeRoom={this.props.activeRoom} activeUser={this.props.activeUser}/>
            </div>
        )
    }
}

export default RoomList;