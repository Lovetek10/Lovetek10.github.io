import React, {Component} from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom'; 

class WaitScreen extends Component {
    interval;
    state = {
        textToDisplay: "Please wait for everyones answers",
        redirect: false,
        newPage: ""
    };

    componentWillMount() {
        this.resetRedirect();
        this.interval = setInterval(this.fetchNewPage, 200);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    resetRedirect() {
      axios.get('http://localhost:3001/resetredirect')
      .then(function (response) {
        console.log(response);
        })
       .catch(function (error) {
       console.log(error);
       });
  }
    
    fetchNewPage = () => {
      let that = this;
        axios.get('http://localhost:3001/getnextwebpage')
        .then(function (response) {
          console.log(response);
          if(response.data !== "") {
            that.setState({
              redirect: true,
              newPage: response.data
            })
          }
         })
         .catch(function (error) {
         console.log(error);
         });
    }

    render() {
      if(this.state.redirect === true) {
        return <Redirect push to={"/" + this.state.newPage} />;
      } else {
          return (
              <div className="content">
                <h1 className="main-title">{this.state.textToDisplay}</h1>
            </div>
          );
            }
    }
}
export default WaitScreen;
