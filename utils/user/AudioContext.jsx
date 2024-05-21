// context/AudioContext.js
import React, { createContext, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"

export const AudioContext = createContext({
  audioEnabled: false,
  setAudioEnabled: () => {},
})

export const AudioProvider = ({ children }) => {
  const [audioEnabled, setAudioEnabled] = useState(() => {
    const audioEnabledFromCookie = Cookies.get("audioEnabled")
    return audioEnabledFromCookie ? JSON.parse(audioEnabledFromCookie) : false
  })

  useEffect(() => {
    Cookies.set("audioEnabled", audioEnabled)
  }, [audioEnabled])

  return <AudioContext.Provider value={{ audioEnabled, setAudioEnabled }}>{children}</AudioContext.Provider>
}

export const useAudio = () => useContext(AudioContext)
