import React from 'react';
import "./App.css";

import{
  BrowserRouter  as Router, Switch, Route, Redirect
} from 'react-router-dom';
import Main from './components/QandA/Main';
import Question from './components/QandA/Add-Question/Question';
import ViewQuestion from './components/QandA/ViewQuestion'

function App() {
  return (
    <div className="App">
      <Router>
        
        <Switch>
          <Route exact path='/add-question' component = {Question} />
          <Route exact path='/question' component = {ViewQuestion} />
          <Route exact path='/' component = {Main} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
