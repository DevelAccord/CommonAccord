import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import Layout from './commonaccord/components/Layout'
import Homepage from './commonaccord/components/Homepage'
import Directory from './commonaccord/components/Directory'
import File from './commonaccord/components/File'
import NotFound from './commonaccord/components/NotFound'

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={Homepage}/>
    <Route path='docs/' component={Directory}/>
    <Route path='docs/**/' component={Directory}/>
    <Route path='docs/**' component={File}/>
    <Redirect from="docs" to="docs/" />
    <Route path="*" component={NotFound}/>
  </Route>
);


if (module.hot) {
  module.hot.accept()
}
