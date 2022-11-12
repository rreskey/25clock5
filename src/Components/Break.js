import React from 'react'
import { useBreak } from '../Contexts/BreakProvider'

export default function Break({ formatTime }) {
const {Break, increaseBreak, decreaseBreak} = useBreak()

return (
    <div className='break-length'>
        <h3>Break length</h3>
        <div className='adjust'>
            <button onClick={decreaseBreak} className='btn btn_adjust'>-</button>
            <div className='number'>{formatTime(Break)}</div>
            <button onClick={increaseBreak} className='btn btn_adjust'>+</button>
        </div>
    </div>
  )
}
