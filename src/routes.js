import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './commonaccord/components/Layout'
import Homepage from './commonaccord/components/Homepage'
import Directory from './commonaccord/components/Directory'
import File from './commonaccord/components/File'
import NotFound from './commonaccord/components/NotFound'

const routes = (
  <Route path='/' component={Layout}>
    <IndexRoute component={Homepage}/>
    <Route path='docs/' component={Directory}/>
    <Route path='docs/**/' component={Directory}/>
    <Route path='docs/**' component={File}/>
    <Route path="*" component={NotFound}/>
  </Route>
);

if (module.hot) {
  module.hot.accept()
}
