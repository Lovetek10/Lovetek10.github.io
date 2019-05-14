import React, {Component} from "react";
import axios from 'axios';
import Button from "../Reuseable/Button";
import { Redirect } from 'react-router-dom'; 

class NameSelect extends Component {
  state = {
      textBoxValue: "",
      redirect: false
  };

  // componentDidMount() {
  //     axios.get('http://localhost:3001/test')
  //      .then(function (response) {
  //        console.log(response.data);
  //       })
  //    .catch(function (error) {
  //       console.log(error);
  //   });
  // }

  textChangeHandler = (event) => {
      let textValue = event.target.value;
      this.setState({
          textBoxValue: textValue
      });
  }

  submitClick = () => {
    axios.post('http://localhost:3001/setname',{
        id: localStorage.getItem('PlayerID'),
        text: this.state.textBoxValue
      })
      .then((response) => {
        this.setState({
            redirect: true
        });
      })
    .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/characterselect" />;
    } else {
        return (
            <div className="content">
              <h1 className="main-title">Enter your name</h1>
                <input
            className="input"
            value={this.state.textBoxValue}
            onChange={event => this.textChangeHandler(event)}
            autoFocus={true}
            maxLength="22"
            autoComplete="off"
            onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.submitClick();
                }
              }}
            />
            <Button 
              submitClick = {this.submitClick.bind(this)}
              buttonText = "Submit"
            />
          </div>
        );
     }
  }
}
export default NameSelect;
