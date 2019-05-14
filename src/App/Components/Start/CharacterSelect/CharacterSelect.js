import React, {Component} from "react";
import axios from 'axios';
import Character from './Character';
import Button from '../../Reuseable/Button';
import { Redirect } from 'react-router-dom'; 

class CharacterSelect extends Component {
    state = {
        textBoxValue: "",
        currentlySelectedCharacter: false,
        redirect: false
    };


    submitClick = () => {
        axios.post('http://localhost:3001/setcharacter',{
            id: localStorage.getItem('PlayerID'),
            character: this.state.currentlySelectedCharacter
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

    characterClick = (character) => {
      this.setState({
        currentlySelectedCharacter: character
      })
      console.log(character);
    }

    render() {
      if (this.state.redirect) {
        return <Redirect push to="/everybodyin" />;
      } else {
        return (
            <div className="content">
              <h1 className="main-title">Choose a Character</h1>
              <div className="character-list">
                <Character 
                  image="monkey"
                  characterClick={this.characterClick}
                  currentlySelectedCharacter={this.state.currentlySelectedCharacter}
                />
                <Character 
                  image="elephant"
                  characterClick={this.characterClick}
                  currentlySelectedCharacter={this.state.currentlySelectedCharacter}
                />
                <Character 
                  image="rabbit"
                  characterClick={this.characterClick}
                  currentlySelectedCharacter={this.state.currentlySelectedCharacter}
                />
                <Character 
                  image="cheetah"
                  characterClick={this.characterClick}
                  currentlySelectedCharacter={this.state.currentlySelectedCharacter}
                />
              </div>

              {this.state.currentlySelectedCharacter ? 
              (<div className="character-select-button">
                <Button 
                  submitClick = {this.submitClick.bind(this)}
                  buttonText = "Submit"
                />
               </div>) : (<div className="character-select-button"></div>) }
            </div>
        );
              }
    }
}
export default CharacterSelect;