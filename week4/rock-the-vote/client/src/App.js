import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Issues from './components/Issues.js'

export default function App(){
  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route 
          exact path="/" 
          render={()=> <Auth />}
        />
        <Route 
          path="/profile"
          render={() => <Profile />}
        />
        <Route 
          path="/issues"
          render={() => <Issues />}
        />
      </Switch>
    </div>
  )
}