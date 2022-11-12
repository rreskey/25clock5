import React, { useContext, useState } from 'react'

const SessionContext = React.createContext()

export function useSession() {
  return useContext(SessionContext)
}

export function SessionProvider({ children }) {
  const [Session, setSession] = useState(1500);
  const [Minutes, setMinutes] = useState(0)
  const [Seconds, setSeconds] = useState(5)

  const increaseSession = () => {
    if (Session === 3600) {
      return Session
    } else {
      setSession(prevSession => prevSession + 60)
      setMinutes(prevMinutes => prevMinutes + 1)
    }
  }

  const decreaseSession = () => {
    if (Session === 300) {
      return Session
    } else {
      setSession(prevSession => prevSession - 60)
      setMinutes(prevMinutes => prevMinutes - 1)
    }
  }

  return (
    <SessionContext.Provider value={{Session, increaseSession, decreaseSession, Minutes, Seconds, setMinutes, setSeconds}}>
      { children }
    </SessionContext.Provider>
  )
}
