// Name: Stopwatch
// Purpose / what code does: This is the stopwatch component implementation where the user can start, stop, and reset the stopwatch. 
// Programmers: Gabi Kruger, Brooke West, Emily Proctor, Kenadi Krueger, Nathan Mignot
// Date created: 11/05/2023
// Date revised: 4/21/2024
  // Major Revisions:
    // Date: 11/05/2023, Author: Gabi Kruger
      // Modification: Implementation of the stopwatch tsx and css files. 
    //Date: 12/03/2023, Author: Gabi Kruger
      //Modification: CSS updates
// Preconditions: The user must be logged in and utilizing the fitness page. 
  // Acceptable inputs: Pushing a button 
  // Unacceptable inputs: n/a
// Postconditions: Stopwatch can start, stop, and reset.
  // Return values: None explicitly returned. The component renders UI elements.
// Error and exception condition values: n/a
// Side Effects
  // State Updates: n/a
  // Network Requests: HTTP requests
// Invariants
  // UI Consistency (logo, navigation bar, buttons, etc.) This component is a part of the greater fitness tracker page. 



  import React, { useState, useRef } from "react";

  function Stopwatch() {
    //declare variables here
    const [isRunning, setIsRunning] = useState(false); //keep track of if it is running
    const [time, setTime] = useState(0); //store the elapsed time
    
    //reference for storing timer ID
    const timerRef = useRef<number | null>(null);
  
    //function to start the timer
    const startTimer = () => { 
      if (!isRunning) {
        const startTime = Date.now() - time; //find the initial time
        timerRef.current = window.setInterval(() => //update every 10 milliseconds
        {
          setTime(Date.now() - startTime);  
        }, 10);
        setIsRunning(true); //update state to know that it is running 
      }
    };
  
    //function to stop the timer
    const stopTimer = () => {
      if (isRunning) {
        if (timerRef.current) {
          clearInterval(timerRef.current); //clear when stopping
        }
        setIsRunning(false); //update running state that stopwatch is stopped
      }
    };
  
    //function to reset the timer
    const resetTimer = () => {
      stopTimer(); //stop timer
      setTime(0); //reset the time to 0
    };
  
     //format the time
    const formatTime = (milliseconds: number) => {
      const minutes = Math.floor(milliseconds / 60000);
      const seconds = Math.floor((milliseconds % 60000) / 1000);
      const centiseconds = Math.floor((milliseconds % 1000) / 10);
  
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`; //minute, seconds, centiseconds
    };
    //stopwatch component set up
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
  
  
  
  
  