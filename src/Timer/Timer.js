import React, {useState, useEffect} from "react";


const Countdown = (Session, Break, isStarted, isReset) => {
    const [InitialMinutes, setInialMinutes] = useState(Session / 60);
    const [InitialSeconds, setInitialSeconds] = useState(Session % 60);
    const [minutes, setMinutes ] = useState(InitialMinutes);
    const [seconds, setSeconds ] =  useState(InitialSeconds);
    
    const [InitalBreakMinutes, setInitalBreakMinutes] = React.useState(Math.floor(Break / 60));
    const [InitalBreakSeconds, setInitalBreakSeconds] = React.useState(Break % 60);
    const [BreakMinutes, setBreakMinutes] = React.useState(InitalBreakMinutes);
    const [BreakSeconds, setBreakSeconds] = React.useState(InitalBreakSeconds);

    const [OnBreak, setOnBreak] = React.useState(false);

    useEffect(() => {
        setInitalBreakMinutes(Math.floor(Break / 60));
        setInitalBreakSeconds(Break % 60);
        setBreakMinutes(InitalBreakMinutes);
        setBreakSeconds(InitalBreakSeconds);
    }, [Break, InitalBreakMinutes, InitalBreakSeconds])

    useEffect(() => {
        setInialMinutes(Math.floor(Session / 60));
        setInitialSeconds(Session % 60);
        setMinutes(InitialMinutes);
        setSeconds(InitialSeconds);
      }, [Session, InitialMinutes, InitialSeconds]);

      useEffect(() => {
            setMinutes(InitialMinutes);
            setSeconds(InitialSeconds);
            setBreakMinutes(InitalBreakMinutes) ;
            setBreakSeconds(InitalBreakSeconds);
            setOnBreak(false)
    }, [isReset])

    useEffect(() => {
        if (isStarted && OnBreak) {
            let myInterval = setInterval(() => {
                if (BreakSeconds > 0) {
                    setBreakSeconds(BreakSeconds - 1);
                }
                if (BreakSeconds === 0) {
                    if (BreakMinutes === 0) {
                        setOnBreak(false)
                        setMinutes(InitialMinutes)
                        setSeconds(InitialSeconds)
                        clearInterval(myInterval)
                    } else {
                        setBreakMinutes(BreakMinutes - 1);
                        setBreakSeconds(59);
                    }
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        }
    }, [BreakMinutes, BreakSeconds, OnBreak, isStarted])

    useEffect(()=>{ 
        if (isStarted && !OnBreak) {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setOnBreak(true)
                    setBreakMinutes(InitalBreakMinutes)
                    setBreakSeconds(InitalBreakSeconds)
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    }}, [minutes, seconds, isStarted]);

    return (
        <div className="display-session">
        <h4>Session</h4>
        { minutes === 0 && seconds === 0
            ? <h1>{BreakMinutes}:{BreakSeconds < 10? `0${BreakSeconds}` : BreakSeconds}</h1>
            : <h1>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

function Timer({ session, break_ }) {
    const [isStarted, setIsStarted] = React.useState(false);
    const [isReset, setIsReset] = React.useState(false);
    const buttons = document.querySelectorAll('.btn_adjust');
        
    const startCountdown = (isStarted) => {
        buttons.forEach(button => button.disabled = true)
        const startButton = document.querySelector('#startButton')
        startButton.textContent === 'Start'
            ? startButton.textContent = 'Pause' 
            : startButton.textContent = 'Start'
        setIsStarted(isStarted)
    }

    const resetCountdown = (isReset, isStarted) => {
        buttons.forEach(button => button.disabled = false)
        document.querySelector('#startButton').textContent = 'Start'
        setIsReset(isReset)
        setIsStarted(false)
    }

    return (
    <div className='timer'>
        {Countdown(session, break_, isStarted, isReset)}
        <div class="block">
            <button id='startButton' onClick={() => startCountdown(!isStarted)} className="btn btn-display">Start</button>
            <button id='resetButton' onClick={() => resetCountdown(!isReset, isStarted)} className="btn btn-display">Reset</button>
        </div>
    </div>
    )
}

export default Timer