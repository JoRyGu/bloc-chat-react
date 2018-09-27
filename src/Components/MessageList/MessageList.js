import React, {Component} from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({messages: this.state.messages.concat(message)});
        });
    }

    handleButtonClick(event) {
        event.preventDefault(); // prevent submission on button press
        const messageContent = event.target.parentNode.firstChild.value;
        this.createMessage(messageContent);
        event.target.parentNode.firstChild.value = '';
    }

    createMessage(content) {
        this.messagesRef.push({
            content: content,
            roomId: this.props.activeRoom,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            userName: this.props.activeUser === null ? 'Guest' : this.props.activeUser.displayName
        })
    }

    render() {
        if (this.props.activeRoom === '') {
            return <p>Room Has Not Been Selected</p>
        }

        return (
            <div>
                {this.state.messages.map(message => {
                    if (message.roomId === this.props.activeRoom) {
                        return (
                            <div key={message.key}>
                                <p>{message.userName} ({message.sentAt}): {message.content}</p>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
                {this.state.messages.filter(message => message.roomId === this.props.activeRoom).length === 0 ?
                    <p>No messages here yet..</p> : null}
                <form>
                    <input type="text" placeholder="Enter a new message.."/>
                    <button onClick={this.handleButtonClick}>Submmit</button>
                </form>
            </div>
        )
    }
}

export default MessageList;