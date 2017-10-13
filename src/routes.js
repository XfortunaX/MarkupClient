/**
 * Created by sergey on 07.08.17.
 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App/index'
import Home from './components/Home/index'
import Login from './components/Login/index'
import Signup from './components/Signup/index'
import Profile from './components/Profile/index'
import ImageLoad from './components/ImageLoad/index'
import MarkupCategory from './components/MarkupCategory/index'
import Markup from './components/Markup/index'
import NotFound from './components/NotFound/index'

export const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='login' component={Login} />
      <Route path='signup' component={Signup} />
      <Route path='markup' component={Markup} />
      <Route path='profile' component={Profile} />
      <Route path='image_load' component={ImageLoad} />
      <Route path='markup_category' component={MarkupCategory} />
    </Route>
    <Route path='*' component={NotFound} />
  </div>
)