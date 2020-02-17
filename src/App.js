import React from 'react';
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom'
import './App.css';

//Componentes
import Profile from "./components/Profile";
import Contributors from "./components/Contributors";


function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/" component={Profile} />
                <Route path="/contributors" component={Contributors} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
