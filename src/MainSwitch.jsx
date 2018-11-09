import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";

const MainSwitch = () => (
  <BrowserRouter>
  <Switch>
    <Route exact path='/' component={LoginPage}/>
    <Route exact path='/create-page' component={CreatePage}/>
    <Route exact path='/find' component={SearchPage}/>
    <Route exact path='/help' component={HelpPage}/>
    <Route exact path='/settings' component={SettingsPage}/>
  </Switch>
  </BrowserRouter>
);

export default MainSwitch;
