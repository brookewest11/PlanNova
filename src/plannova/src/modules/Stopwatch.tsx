/*
TSX File for the Stopwatch Component
*/

// Stopwatch
// • works as a typical stop watch, can start time, stop time, pause, reset, etc.
// • Gabi Kruger
// • November 5th 2023 (first update)
// • November 19th, 2023
// • Updated: fixed some bugs

import React, { useState, useRef } from "react";

function Stopwatch() {
  //declare variables here
  const [isRunning, setIsRunning] = useState(false); //keep track of if it is running
  const [time, setTime] = useState(0); //store the elapsed time
  
  const timerRef = useRef<number | null>(null); //reference for storing timer ID

  const startTimer = () => { //function to start the timer
    if (!isRunning) {
      const startTime = Date.now() - time; //find the initial time
      timerRef.current = window.setInterval(() => //update every 10 milliseconds
      {
        setTime(Date.now() - startTime);  
      }, 10);
      setIsRunning(true); //update state to know that it is running 
    }
  };

  const stopTimer = () => { //function to stop the timer
    if (isRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current); //clear when stopping
      }
      setIsRunning(false); //update running state that stopwatch is stopped
    }
  };

  const resetTimer = () => { //function to reset the timer
    stopTimer(); //stop timer
    setTime(0); //reset the time to 0
  };

  const formatTime = (milliseconds: number) => { //format time
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`; //minute, seconds, centiseconds
  };
  //stopwatch component
  return (
    <div style={{ backgroundColor: "#7bab7ac6", padding: "10px", width: "350px", height: "230px", marginTop:"10px", marginLeft: "20px", fontFamily: "Outfit, sans-serif" }}>
      <div className="Stopwatch">
        <h2 style={{ textAlign: "center" }}>stopwatch</h2>
        <div style={{ textAlign: "center" }} className="display">{formatTime(time)}</div>
        <div style={{ textAlign: "center", marginTop: "30px" }} className="controls">
          <button onClick={startTimer} disabled={isRunning}>
            start
          </button>
          <button onClick={stopTimer} disabled={!isRunning}>
            stop
          </button>
          <button onClick={resetTimer}>reset</button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;

