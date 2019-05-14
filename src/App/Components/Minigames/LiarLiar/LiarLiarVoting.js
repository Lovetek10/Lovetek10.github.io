import React, {Component} from "react";
import axios from 'axios';
import Button from "../../Reuseable/Button";
import { Redirect } from 'react-router-dom'; 

class LiarLiarVoting extends Component {
    state = {
        textBoxValue: "",
        currentQuestion: "",
        currentLie: "",
        redirect: false,
        isLiar: false
    };
    interval;

    componentWillMount() {
      let that = this;
      axios.get('http://localhost:3001/amiliar?id=' + localStorage.getItem("PlayerID"))
            .then(function (response) {
              if(response.data === true) {
                that.setState({
                  isLiar: true
                });
                that.interval = setInterval(that.HasEveryoneAnswered, 200);
              }
            })
            .catch(function (error) {
                console.log(error);
             });
      }

      HasEveryoneAnswered() {
        let that = this;
        axios.get('http://localhost:3001/gethaseveryoneanswered')
          .then((response) => {
            if(response.data === "true") {
              that.setState({
                  redirect: true
              });
           }
          })
        .catch((error) => {
            console.log(error);
         });
      }

    submitClick = (truthorlie) => {
      console.log(truthorlie);
        axios.post('http://localhost:3001/settruthorlie',{
            id: localStorage.getItem("PlayerID"),
            truthorlie: truthorlie
          })
          .then((response) => {
            if(response.data === true) {
              this.setState({
                  redirect: true
              });
           }
          })
        .catch((error) => {
            console.log(error);
         });
    }

    render() {
      if(this.state.redirect === true) {
        return <Redirect push to="/waitscreen" />;
    }  else if(this.state.isLiar === true) {
      return <h1>You are the liar</h1>
    }
    else {
        return (
            <div className="content">
              <h1 className="main-title">Make your decision, Truth or Lie?</h1>
              <div className="truthorlie-button">
                <Button 
                  submitClick = {() => this.submitClick("true")}
                  buttonText = "Truth"
                />
                </div>
              <div className="margin-top truthorlie-button">
                <Button 
                  submitClick = {() => this.submitClick("false")}
                  buttonText = "Lie"
                />
              </div>  
            </div>
        );
            }
    }
}
export default LiarLiarVoting;
