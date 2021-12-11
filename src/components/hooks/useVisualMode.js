import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(change, replace = false) {
    if(replace){
      setMode(change)
      history.splice(0,1,change)
      setHistory(history)
    } else {
      setMode(change)
      history.push(mode)
      setHistory(history)
    }
  }

  function back() {
    if(history[history.length-1] !== initial){
      setMode(history[history.length-1])
      history.pop()
      setHistory(history)
    } else {
      setMode(initial)
    }
  }

  return { mode, transition, back };
}