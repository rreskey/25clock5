import React, { useState, useEffect, useRef } from 'react'
import { useBreak } from "../Contexts/BreakProvider";
import { useSession } from '../Contexts/SessionProvider';

export default function Clock() {
    console.log(' i rendered ')
    const { breakMinutes } = useBreak()
    const { Minutes, Seconds, setSeconds, setMinutes } = useSession()
    const buttons = document.querySelectorAll('.btn_adjust');

    const InitialMinutes = useRef(Minutes)
    const InitialSeconds = useRef(Seconds)

    const [OnBreak, setOnBreak] = useState(false)
    const [isStarted, setIsStarted] = useState(false)

    useEffect(() => {
        if(isStarted) {
            let interval = setInterval(() => {
                if (Seconds === 0) {
                    if (Minutes !== 0) {
                        setSeconds(59);
                        setMinutes(Minutes - 1);
                    } else {
                    let minutes = OnBreak ? Minutes : breakMinutes - 1;
                    let seconds = 5;
          
                    setSeconds(seconds);
                    setMinutes(minutes);
                    setOnBreak(!OnBreak);
                  }
                } else {
                  setSeconds(Seconds - 1);
                }
              }, 1000);
              return () => { 
                clearInterval(interval)
            }
        }}, [Seconds, isStarted]);

    const startCountdown = (isStarted) => {
        buttons.forEach(button => button.disabled = true)
        const startButton = document.querySelector('#startButton')
        startButton.textContent === 'Start'
            ? startButton.textContent = 'Pause' 
            : startButton.textContent = 'Start'
        setIsStarted(isStarted)
    }

    const resetCountdown = () => {
        buttons.forEach(button => button.disabled = false)
        document.querySelector('#startButton').textContent = 'Start'
        setIsStarted(false)
        setOnBreak(false)
        setMinutes(InitialMinutes.current)
        setSeconds(InitialSeconds.current)
    }

return (
    <div className="timer">
        <div className="display-session">
            <h4>{OnBreak? 'Break': 'Session'}</h4>
            { 
                <h1>{Minutes}:{Seconds < 10 ?  `0${Seconds}` : Seconds}</h1>
            }
        </div>
        <div className="block">
            <button id='startButton' onClick={() => startCountdown(!isStarted)} className="btn btn-display">Start</button>
            <button id='resetButton' onClick={() => resetCountdown()} className="btn btn-display">Reset</button>
        </div>
    </div>
  )
}