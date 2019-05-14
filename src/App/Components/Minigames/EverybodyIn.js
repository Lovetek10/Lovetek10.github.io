import React, {Component} from "react";
import axios from 'axios';
import Button from "../Reuseable/Button";
import { Redirect } from 'react-router-dom'; 

class EverybodyIn extends Component {  
  state = {
        redirect: false,
        countingdown: false
    };
    interval;

    componentWillMount() {
      this.isEverybodyIn();
      this.interval = setInterval(this.isEverybodyIn, 500);
    }

    componentWillUnmount() {
      this.interval = clearInterval(this.isEverybodyIn);
    }

    
    isEverybodyIn = ()=> {
      axios.get('http://localhost:3001/iseverybodyin')
      .then((response) => {
        this.setState({
          countingdown: response.data.StartPressed
        }, () => {
          console.log(response.data.GameStarted);
          if(response.data.GameStarted) {
            clearInterval(this.interval);
            this.setState({
              redirect: true
            });
          }
        });
      })
    .catch((error) => {
        console.log(error);
     });
    }

    submitClick = () => {
      if(!this.state.countingdown) {
        axios.get('http://localhost:3001/everybodyin')
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
      } else {
        axios.get('http://localhost:3001/everybodynotin')
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
      }
    }

    // submitClick = () => {
    //   console.log("click");
    //   this.setState({
    //     countingdown: true
    //   }, () => {
    //     if(this.state.countingdown === true) {
    //       console.log("countdown");
    //       const interval = setInterval(() => {
    //         if(this.state.countdown > 0) {
    //           this.setState({
    //             countdown: this.state.countdown -1
    //           });
    //         }
    //         else {
    //           clearInterval(interval);
    //           this.serverRequest();
    //         }
    //       }, 1000);

    //     } else {
    //       this.setState({
    //         countdown: 3
    //       });
    //     }
    //   });
    // }
      //this.serverRequest();

    render() {
      if(this.state.redirect === true) {
        return <Redirect push to="/liarliar" />;
    } else {
        return (
            <div className="content">
            <h1>{this.state.countingdown}</h1>
            <Button 
              submitClick = {this.submitClick.bind(this)}
              buttonText = {this.state.countingdown ? "Cancel" : "Everybody's In"}
            />
          </div>
        );
      }
    }
}
export default EverybodyIn;
