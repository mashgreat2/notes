import React from 'react';
import { Route } from 'react-router-dom';

import NotesContainer from './containers/NotesContainer'
import NormalLoginForm from "./containers/LoginContainer";

const BaseRouter = () => (

  <div>
    <Route exact path='/notes/' component={NotesContainer} />
    <Route exact path='/login/' component={NormalLoginForm} />
  </div>
);

export default BaseRouter;