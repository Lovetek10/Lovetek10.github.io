import React, {Component} from 'react';
import Button from '../Reuseable/Button';
import { Redirect } from 'react-router-dom'; 
import axios from 'axios';

class Start extends Component {
    state = {
        redirect: false,
        textBoxValue: ""
    }

    componentDidMount() {
        localStorage.clear();
    }

    enterRoom = () => {
        if(!localStorage.getItem('PlayerID')) {
            axios.get('http://localhost:3001/newplayer')
            .then(function (response) {
                    localStorage.setItem('PlayerID', response.data);
                    console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
             });
        }
        this.setState({
            redirect: true
        });
    }
    
    submitClick = () => {
        let that = this;
        axios.get('http://localhost:3001/checkcode?roomCode=' +this.state.textBoxValue)
            .then(function (response) {
                    if(response.data === true) {
                      that.enterRoom();
                    }
            })
            .catch(function (error) {
                console.log(error);
             });
    }

    textChangeHandler = (event) => {
        let textValue = event.target.value.toUpperCase();
        this.setState({
            textBoxValue: textValue
        });

    }


    render() {
        if(this.state.redirect === true) {
            return <Redirect push to="/nameselect" />;
        } else {
            return (
                <div className="content">
                     <h1 className="main-title">Enter the room code on the screen</h1>
                    <input
                    className="input"
                    value={this.state.textBoxValue}
                    onChange={event => this.textChangeHandler(event)}
                    autoFocus={true}
                    maxLength="4"
                    autoComplete="off"
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.submitClick();
                        }
                        }}
                    />
                    <div>
                        <Button 
                            submitClick = {this.submitClick.bind(this)}
                            buttonText = "Enter room"
                        />
                    </div>
                </div>
            );
        }
    }
}

export default Start;