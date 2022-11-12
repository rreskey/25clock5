import React, { useState, useEffect , useRef, useCallback} from 'react'
import { useBreak } from "../Contexts/BreakProvider";
import { useSession } from '../Contexts/SessionProvider';

export default function Clock() {
    console.log(' i rendered ')
    const { breakMinutes, breakSeconds, setBreakMinutes, setBreakSeconds } = useBreak()
    const { minutes, seconds, setSeconds, setMinutes } = useSession()
    const buttons = document.querySelectorAll('.btn_adjust');

    const InitialMinutes = useRef(minutes)
    const InitialSeconds = useRef(seconds)
    const InitalBreakMinutes = useRef(breakMinutes)
    const InitalBreakSeconds = useRef(breakSeconds)

    const [OnBreak, setOnBreak] = useState(false);  

    const [isStarted, setIsStarted] = useState(false);
    
    useEffect(() => {
        if (isStarted && OnBreak) {
            let myInterval = setInterval(() => {
                if (breakSeconds > 0) {
                    setBreakSeconds(breakSeconds - 1);
                }
                if (breakSeconds === 0) {
                    if (breakMinutes === 0) {
                        setOnBreak(false)
                        setMinutes(InitialMinutes.current) 
                        setMinutes(InitialSeconds.current)
                        clearInterval(myInterval)
                    } else {
                        setBreakMinutes(breakMinutes - 1);
                        setBreakSeconds(59);
                    }
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        }
    }, [breakMinutes, breakSeconds, OnBreak, isStarted])

    useEffect(()=>{
            if (isStarted && !OnBreak) {
                let myInterval = setInterval(() => {
                    if (seconds > 0) {
                        setSeconds(seconds - 1)
                    }
                    if (seconds === 0) {
                        if (minutes === 0) {
                            setOnBreak(true)
                            setBreakMinutes(InitalBreakMinutes.current)
                            setBreakSeconds(InitalBreakSeconds.current)
                            clearInterval(myInterval)
                        } else {
                            setMinutes(minutes - 1)
                            setSeconds(59)
                        }
                    } 
                }, 1000)
                return ()=> {
                    clearInterval(myInterval);
                  };
            } 
    }, [isStarted, minutes, seconds]);

    
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
        setOnBreak(false)
        setMinutes(InitialMinutes.current)
        setSeconds(InitialSeconds.current)
        setBreakMinutes(InitalBreakMinutes.current)
        setBreakSeconds(InitalBreakSeconds.current)
        setIsStarted(false)
    }

return (
    <div className="timer">
        <div className="display-session">
            <h4>Session</h4>
            { minutes === 0 && seconds === 0
                ? <h1>{breakMinutes}:{breakSeconds < 10? `0${breakSeconds}` : breakSeconds}</h1>
                : <h1>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1>
            }
        </div>
        <div className="block">
            <button id='startButton' onClick={() => startCountdown(!isStarted)} className="btn btn-display">Start</button>
            <button id='resetButton' onClick={() => resetCountdown()} className="btn btn-display">Reset</button>
        </div>
    </div>
  )
} 