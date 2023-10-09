import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthCal.css";


function tileContent({}) {}

function MonthCal() {
  const [date, setDate] = useState<any>(new Date());
  const [task1, setTask1] = useState<string>('');
  const [todos1, setTodos1] = useState<string[]>([]);
  const [task2, setTask2] = useState<string>('');
  const [todos2, setTodos2] = useState<string[]>([]);
  const [task3, setTask3] = useState<string>('');
  const [todos3, setTodos3] = useState<string[]>([]);
  const [task4, setTask4] = useState<string>('');
  const [todos4, setTodos4] = useState<string[]>([]);
  const [task5, setTask5] = useState<string>('');
  const [todos5, setTodos5] = useState<string[]>([]);
  const [task6, setTask6] = useState<string>('');
  const [todos6, setTodos6] = useState<string[]>([]);
  const [task7, setTask7] = useState<string>('');
  const [todos7, setTodos7] = useState<string[]>([]);

  // Function to add a task for each day of the week
  const addTodo = (task: string, setTask: React.Dispatch<React.SetStateAction<string>>, setTodos: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (task.trim() !== '') {
      setTodos((prevTodos) => [...prevTodos, task]);
      setTask('');
    }
  };

  // Function to remove a task for each day of the week
  const removeTodo = (index: number, setTodos: React.Dispatch<React.SetStateAction<string[]>>) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  return (
    <div>
       <h2>Weekly Schedule:</h2>
      <table>
        <tr>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </tr>
        <tr>
          {[task1, task2, task3, task4, task5, task6, task7].map((task, dayIndex) => (
            <td key={dayIndex}>
              <p>To-Do List</p>
              <div className="newheader">
                <input
                  type="text"
                  placeholder="Enter a task"
                  value={task}
                  onChange={(e) => {
                    switch (dayIndex) {
                      case 0:
                        setTask1(e.target.value);
                        break;
                      case 1:
                        setTask2(e.target.value);
                        break;
                      case 2:
                        setTask3(e.target.value);
                        break;
                      case 3:
                        setTask4(e.target.value);
                        break;
                      case 4:
                        setTask5(e.target.value);
                        break;
                      case 5:
                        setTask6(e.target.value);
                        break;
                      case 6:
                        setTask7(e.target.value);
                        break;
                      default:
                        break;
                    }
                  }}
                />
                <button
                  onClick={() => {
                    switch (dayIndex) {
                      case 0:
                        addTodo(task, setTask1, setTodos1);
                        break;
                      case 1:
                        addTodo(task, setTask2, setTodos2);
                        break;
                      case 2:
                        addTodo(task, setTask3, setTodos3);
                        break;
                      case 3:
                        addTodo(task, setTask4, setTodos4);
                        break;
                      case 4:
                        addTodo(task, setTask5, setTodos5);
                        break;
                      case 5:
                        addTodo(task, setTask6, setTodos6);
                        break;
                      case 6:
                        addTodo(task, setTask7, setTodos7);
                        break;
                      default:
                        break;
                    }
                  }}
                  className="addBtn"
                >
                  Add
                </button>
              </div>
              <ul>
                {[
                  todos1,
                  todos2,
                  todos3,
                  todos4,
                  todos5,
                  todos6,
                  todos7,
                ][dayIndex].map((todo, index) => (
                  <li key={index}>
                    {todo}
                    <button
                      onClick={() => {
                        switch (dayIndex) {
                          case 0:
                            removeTodo(index, setTodos1);
                            break;
                          case 1:
                            removeTodo(index, setTodos2);
                            break;
                          case 2:
                            removeTodo(index, setTodos3);
                            break;
                          case 3:
                            removeTodo(index, setTodos4);
                            break;
                          case 4:
                            removeTodo(index, setTodos5);
                            break;
                          case 5:
                            removeTodo(index, setTodos6);
                            break;
                          case 6:
                            removeTodo(index, setTodos7);
                            break;
                          default:
                            break;
                        }
                      }}
                      className="deleteBtn"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </td>
          ))}
        </tr>
      </table>
      <Calendar
        onChange={setDate}
        value={date}
        defaultValue="month"
        calendarType="US"
        showNavigation={false}
        prev2Label={null}
        prevLabel={null}
        nextLabel={null}
        next2Label={null}
      />
    </div>
  );
}

export default MonthCal;
