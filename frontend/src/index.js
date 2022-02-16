import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import CreateAccount from './CreateAccount';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <Header/>
        <div className="content-wrapper">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/create-account">
              <CreateAccount />
            </Route>
            <Route exact path="/chat">
              {window.localStorage.getItem('jwt') == null ? <Redirect to="/login" /> : <App />}
            </Route>
            <Route exact path="/chatbot">
              <App />
            </Route>
            <Route path="/">
              <Info/>
            </Route>
          </Switch>
        </div>
        <Footer/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
