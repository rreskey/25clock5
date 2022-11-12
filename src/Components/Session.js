import React from 'react'
import { useSession } from '../Contexts/SessionProvider'

export default function Session({ formatTime }) {
const {Session, decreaseSession, increaseSession} = useSession() 

    return (
    <div className='session-length'>
        <h3>Session length</h3>
        <div className="adjust">
            <button onClick={decreaseSession} className='btn btn_adjust'>-</button>
            <div className='number' id='session'>{formatTime(Session)}</div>
            <button onClick={increaseSession} className='btn btn_adjust'>+</button>
        </div>
  </div>
  )
}
