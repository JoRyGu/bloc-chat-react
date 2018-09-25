import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            console.log(snapshot.val());
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({rooms: this.state.rooms.concat(room)});
        });
    }

    createRoom(newRoomName) {
        this.roomsRef.push({name: newRoomName});
    }

    handleClick(event) {
        event.preventDefault(); // prevent submit on click
        this.createRoom(event.target.parentNode.firstChild.value); // pass value of text box to createRoom()
        event.target.parentNode.firstChild.value = ''; // reset text box text
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.rooms.map(room => <li key={room.key}>{room.name}</li>)}
                </ul>
                <form>
                    <input type="text"/>
                    <button onClick={this.handleClick}>Submit</button>
                </form>
            </div>
        )
    }
}

export default RoomList;