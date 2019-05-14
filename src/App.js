import React, { Component } from "react";
import { Route, Switch, MemoryRouter } from 'react-router-dom'; 
import LiarLiarQuestion from './App/Components/Minigames/LiarLiar/LiarLiarQuestion';
import LiarLiarVoting from './App/Components/Minigames/LiarLiar/LiarLiarVoting';
import NameSelect from './App/Components/Start/NameSelect';
import CharacterSelect from './App/Components/Start/CharacterSelect/CharacterSelect';
import Start from './App/Components/Start/Start';
import WaitScreen from "./App/Components/Minigames/WaitScreen";
import EverybodyIn from "./App/Components/Minigames/EverybodyIn";
import LiarLiarLying from "./App/Components/Minigames/EverybodyIn";

import './App.css';

class App extends Component {
  render() {
    return (
      <MemoryRouter>
        <div className="page-container">
          <Switch>
            <Route exact path="/" component={Start}/>
            <Route exact path="/nameselect" component={NameSelect} />
            <Route exact path="/characterselect" component={CharacterSelect} />
            <Route exact path="/liarliar" component={LiarLiarQuestion}/>
            <Route exact path="/liarliarvoting" component={LiarLiarVoting}/>
            <Route exact path="/liarliarlying" component={LiarLiarLying}/>
            <Route exact path="/waitscreen" component={WaitScreen} />
            <Route exact path="/everybodyin" component={EverybodyIn} />
          </Switch>
        </div>
      </MemoryRouter>
    );
  }
}

export default App;
