import './App.css';
import React, {useState, useEffect} from 'react';
import Timer from './Timer/Timer';

function App() {
  const [Break, setBreak] = React.useState(300);
  const [Session, setSession] = React.useState(1500);

  const increaseBreak = () => {
    return Break === 3600? Break : setBreak(prevBreak => prevBreak + 60);
  };

  const decreaseBreak = () => {
    return Break === 60? Break : setBreak(prevBreak => prevBreak - 60);
  };

  const increaseSession = () => {
    return Session === 3600? Session : setSession(prevSession => prevSession + 60);
  }

  const decreaseSession = () => {
    return Session === 300? Session : setSession(prevSession => prevSession - 60);
  }

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
              <div className='break-length'>
                <h3>Break length</h3>
                <div className='adjust'>
                  <button onClick={decreaseBreak} className='btn btn_adjust'>-</button>
                  <div className='number'>{formatTime(Break)}</div>
                  <button onClick={increaseBreak} className='btn btn_adjust'>+</button>
                </div>
              </div>
              <div className='session-length'>
                <h3>Session length</h3>
                <div className="adjust">
                  <button onClick={decreaseSession} className='btn btn_adjust'>-</button>
                  <div className='number' id='session'>{formatTime(Session)}</div>
                  <button onClick={increaseSession} className='btn btn_adjust'>+</button>
                </div>
              </div>
            </div>
            <Timer 
              session={Session}
              break_={Break}
            />
          </div>
        </div>
    </div>
  );
}

export default App;
