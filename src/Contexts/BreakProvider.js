import React, { useContext, useState } from 'react'

const BreakContext = React.createContext()

export function useBreak() {
    return useContext(BreakContext)
}

export function BreakProvider({ children }) {
    const [Break, setBreak] = useState(300);
    const [breakMinutes, setBreakMinutes] = useState(1)
    const [breakSeconds, setBreakSeconds] = useState(0)

    const increaseBreak = () => {
    if (Break === 3600) {
        return Break
        } else {
        setBreak(prevBreak => prevBreak + 60)
        setBreakMinutes(prevMinutes => prevMinutes + 1)
        }
    };

    const decreaseBreak = () => {
    if (Break === 300) {
        return Break
    } else {
        setBreak(prevBreak => prevBreak - 60)
        setBreakMinutes(prevMinutes => prevMinutes - 1)
    }
    };
  
    return (
    <BreakContext.Provider value={{Break, increaseBreak, decreaseBreak, breakMinutes, breakSeconds, setBreakMinutes, setBreakSeconds}}>
        {children}
    </BreakContext.Provider>
  )
}
