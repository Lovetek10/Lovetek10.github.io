import React, {Component} from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom'; 

class LiarLiarLying extends Component {
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

    render() {
      if(this.state.redirect === true) {
        return <Redirect push to="/waitscreen" />;
    }  else {
      return <h1>You are the liar</h1>
            }
    }
}
export default LiarLiarLying;
