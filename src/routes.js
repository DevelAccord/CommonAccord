import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import Layout from './components/Layout'
import Homepage from './components/Homepage'
import Folder from './components/Folder'
import File from './components/File'
import NotFound from './components/NotFound'

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={Homepage}/>
    <Route path='docs/' component={Folder}/>
    <Route path='docs/**/' component={Folder}/>
    <Route path='docs/**' component={File}/>
    <Redirect from="docs" to="docs/" />
    <Route path="*" component={NotFound}/>
  </Route>
);


if (module.hot) {
  module.hot.accept()
}
