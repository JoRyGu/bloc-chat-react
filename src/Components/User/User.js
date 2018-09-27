import React, {Component} from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            this.props.setUser(user);
        });
    }

    handleSignIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
        this.setState({loggedIn: true});
    }

    handleSignOut() {
        this.props.firebase.auth().signOut();
        this.setState({loggedIn: false});
    }

    render() {
        return (
            <div>
                {this.props.activeUser === null ?
                    <span>Welcome, Guest!</span>
                    :
                    <span>Welcome, {this.props.activeUser.displayName.split(' ')[0]}!</span>}

                {this.props.activeUser !== null ?
                    <button onClick={this.handleSignOut}>Sign Out</button>
                    :
                    <button onClick={this.handleSignIn}>Sign In</button>}
            </div>
        )
    }
}

export default User;