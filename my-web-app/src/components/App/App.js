import React, {useState} from 'react';
import './App.css';

//Components
import Authentication from '../Auth/Authentication';
import Home from '../Home/Home.js'
import Tags from '../Compo/Tags.js'
import ForYou from '../Compo/ForYou.js'
import News from '../Compo/News.js'
//Routes and Context
import { AuthContext } from "../../context/auth";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import PrivateRoute from '../../routes/PrivateRoute';

import Layout from '../../routes/Layout/Layout';

function App() {
  const sessionToken = sessionStorage.getItem('token');
  const [authToken, setAuthToken] = useState(sessionToken);

  const setToken = (data) => {
    sessionStorage.setItem("token", JSON.stringify(data));
    setAuthToken(data);
  }

  return (
    <AuthContext.Provider value={{authToken, setAuthToken:setToken}}>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={Authentication}/>
          <PrivateRoute path="/home" component={Home} layout={Layout}/>
          <Redirect exact from='/' to='/home'/>
          <PrivateRoute path="/foryou" component={ForYou} layout={Layout}/>
          <PrivateRoute path="/news" component={News} layout={Layout}/>
          <PrivateRoute path="/tags" component={Tags} layout={Layout}/>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
