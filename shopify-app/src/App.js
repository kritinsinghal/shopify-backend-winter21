import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HeaderBar from './components/HeaderBar/HeaderBar';
import Home from './pages/Home/Home';
import UploadInv from './pages/UploadInv/UploadInv';
import APIKey from './pages/Apikey/Apikey';
import Inventory from './pages/Inventory/Inventory';
import './App.css';

function App() {
  console.log(process);
  return (
    <Router>
      <HeaderBar />
      <Switch>
        <Route path="/inventory/:id">
          <Inventory />
        </Route>
        <Route path="/upload">
          <UploadInv />
        </Route>
        <Route path="/apikey">
          <APIKey />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
