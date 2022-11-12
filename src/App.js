import './App.css';
import React from 'react';
import Break from './Components/Break';
import Session from './Components/Session';
import Clock from './Components/Clock';

function App() {

  const formatTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (minutes < 10? `0${minutes}` : minutes) + ':' + (seconds < 10? `0${seconds}` : seconds)
  }

  return (
    <div className="App">
        <div className="wrapper">
          <div className='container'>
            <h1>25 + 5 Clock</h1>
            <div className='length'>
              <Break formatTime={formatTime}/>
              <Session formatTime={formatTime}/>
            </div>
            <Clock />
          </div>
        </div>
    </div>
  );
}

export default App;