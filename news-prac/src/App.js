import './App.css';
import Navbar from './components/Navbar';
import React, { Component } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  state={
    progress: 0
  }
  setProgress= (progress)=> {
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar title="NewsMonkey" />
          <LoadingBar
            height={4}
            color='#7AC74F'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize="18" country="gb" category="general" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize="18" country="gb" category="sports" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize="18" country="gb" category="entertainment" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize="18" country="gb" category="business" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize="18" country="gb" category="science" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize="18" country="gb" category="health" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize="18" country="gb" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

