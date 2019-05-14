import React, {Component} from "react";
import axios from 'axios';
import Button from "../../Reuseable/Button";
import { Redirect } from 'react-router-dom'; 

class LiarLiarQuestion extends Component {
    state = {
        textBoxValue: "",
        currentQuestion: "",
        currentLie: "",
        redirect: false
    };

    componentWillMount() {
      let self = this;
        axios.get('http://localhost:3001/getplayerdetailsandquestion?id='+ localStorage.getItem("PlayerID"))
         .then(function (response) {
           console.log(response.data);
           self.setState({
             currentQuestion: response.data.question
           })
          })
     .catch(function (error) {
          console.log(error);
  });
    }

    textChangeHandler = (event) => {
        let textValue = event.target.value;
        this.setState({
            textBoxValue: textValue
        });

    }


    submitClick = () => {
        axios.post('http://localhost:3001/testpost',{
            id: localStorage.getItem("PlayerID"),
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
      if(this.state.redirect === true) {
        return <Redirect push to="/waitscreen" />;
    } else {
        return (
            <div className="content">
              <h1 className="main-title">{this.state.currentQuestion}</h1>
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
export default LiarLiarQuestion;
