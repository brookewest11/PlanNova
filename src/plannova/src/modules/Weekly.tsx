import React, { useState } from "react";
import "./Weekly.css";

// Import DesktopNotification component
import DesktopNotification from "./Notifs";

function WeeklySchedule() {
  //initializes edit mode to false
  const [editMode, setEditMode] = useState(false);
  //initializes notification time to empty
  const [notificationTimes, setNotificationTimes] = useState<string[]>(['', '', '', '', '', '', '']);
  //initializes tasks to empty
  const [tasks, setTasks] = useState<string[]>(['', '', '', '', '', '', '']);
  //initializes todos to empty
  const [todos, setTodos] = useState<string[][]>([[], [], [], [], [], [], []]);

  //adds todo's to the schedule
  //input: string, number
  //output: new todo to the schedule
  const addTodo = (task: string, dayIndex: number) => {
    if (task.trim() !== '') {
      setTodos((prevTodos) => {
        const newTodos = [...prevTodos];
        newTodos[dayIndex] = [...newTodos[dayIndex], task];
        return newTodos;
      });
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        newTasks[dayIndex] = '';
        return newTasks;
      });
      
    // creates notification if user adds a time to the "to-do"
    const notificationTime = notificationTimes[dayIndex];
    // checks if the notification has a time, if it does then:
    if (notificationTime) {
      // set up the correct form of the number to match the time we want to use for the to-do
      const [hours, minutes] = notificationTime.split(':').map(Number);
      // gets the current time
      const currTime = new Date();
      // sets the scheduled time for the notification to go off
      const scheduledTime = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), hours, minutes);

      // calculates when the notification should go off by subtracting the current time from the scheduled time
      const printNotifsTime = scheduledTime.getTime() - currTime.getTime();
      
      // checks if the time the notification was set for is greater than zero so if they are we can set the reminder to go off on the 
      // desktop to remind the user that they have a task to do
      if (printNotifsTime > 0) {
        // notification prints on time to the desktop by calling the showNotification function defined in Notifs.tsx
        setTimeout(() => {
          DesktopNotification.showNotification("PlanNova Task Reminder", `Don't forget your task: ${task}`);
        }, printNotifsTime);}
      }
    }
  };

  const removeTodo = (index: number, dayIndex: number) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      newTodos[dayIndex] = prevTodos[dayIndex].filter((_, i) => i !== index);
      return newTodos;
    });
  };

  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="weekly">
      <div className="editButtonContainer">
        <button onClick={() => setEditMode(!editMode)} className="view_edit_button">
          {editMode ? "View Schedule" : "Edit Schedule"}
        </button>
      </div>

      <table>
        <tbody>
          <tr className="tr-names">
            {dayNames.map((day, index) => (
              <th key={index} className="th-day">{day}</th>
            ))}
          </tr>
          <tr className="tr-week">
            {tasks.map((task, dayIndex) => (
              <td key={dayIndex} className="td-week">
                <p></p>
                <div className="newheader">
                  {editMode ? (
                    <React.Fragment>
                      <input
                        type="text"
                        className="weekText"
                        placeholder="type here"
                        value={task}
                        onChange={(inputEvent) => setTasks((prevTasks) => {
                          const newTasks = [...prevTasks];
                          newTasks[dayIndex] = inputEvent.target.value;
                          return newTasks;
                        })}
                      />
                      <input
                        //used to set the time for each to-do so we can set up the notification to remind the user
                        type="time"
                        className="notificationTime"
                        value={notificationTimes[dayIndex]}
                        // once the user inputs a time user the "time-picker" setNotificationTimes function is called that sets up the
                        // the correct time to print the notification
                        onChange={(inputEvent) => setNotificationTimes((prevTimes) => {
                          const newTimes = [...prevTimes];
                          newTimes[dayIndex] = inputEvent.target.value;
                          return newTimes;
                        })}
                      />
                      <button className="addBtn" onClick={() => addTodo(task, dayIndex)}>
                        Add
                      </button>
                    </React.Fragment>
                  ) : (
                    <span>{tasks[dayIndex]}</span>
                  )}
                </div>
                <ul>
                  {editMode && todos[dayIndex].map((todo, index: number) => (
                    <li key={index}>
                      {todo}
                      <button className="deleteBtn" onClick={() => removeTodo(index, dayIndex)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <ul>
                  {!editMode && todos[dayIndex].length > 0 && (
                    todos[dayIndex].map((todo, index: number) => (
                      <li key={index}>
                        {todo}
                        {/* Remove button not needed in view mode */}
                      </li>
                    ))
                  )}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WeeklySchedule;
