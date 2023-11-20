import React, { useState } from "react";
import "./Weekly.css";

function WeeklySchedule() {
  const [editMode, setEditMode] = useState(false);

  const [tasks, setTasks] = useState<string[]>(['', '', '', '', '', '', '']);
  const [todos, setTodos] = useState<string[][]>([[], [], [], [], [], [], []]);

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








// import React, { useState } from "react";
// import "./Weekly.css";


// //creates the function used to create a weekly schedule using typescript jsx and react use states
// function WeeklySchedule() {

//     //initializes the set task useState (input value) for weekly schedule - day 1
//     //input: string
//   const [task1, setTask1] = useState<string>('');
//     //initializes the set todos useState (to-do list) for weekly schedule - day 1
//     //input: string; output: array of strings
//   const [todos1, setTodos1] = useState<string[]>([]);
//     //initializes the set task useState (input value) for weekly schedule - day 2
//     //input: string
//   const [task2, setTask2] = useState<string>('');
//     //initializes the set todos useState (to-do list) for weekly schedule - day 2
//     //input: string; output: array of strings
//   const [todos2, setTodos2] = useState<string[]>([]);
//     //initializes the set task useState (input value) for weekly schedule - day 3
//     //input: string
//   const [task3, setTask3] = useState<string>('');
//     //initializes the set todos useState (to-do list) for weekly schedule - day 3
//     //input: string; output: array of strings
//   const [todos3, setTodos3] = useState<string[]>([]);
//     //initializes the set task useState (input value) for weekly schedule - day 4
//     //input: string
//   const [task4, setTask4] = useState<string>('');
//     //initializes the set todos useState (to-do list) for weekly schedule - day 4
//     //input: string; output: array of strings
//   const [todos4, setTodos4] = useState<string[]>([]);
//     //initializes the set task useState (input value) for weekly schedule - day 5
//     //input: string
//   const [task5, setTask5] = useState<string>('');
//     //initializes the set todos useState (to-do list) for weekly schedule - day 5
//     //input: string; output: array of strings
//   const [todos5, setTodos5] = useState<string[]>([]);
//     //initializes the set task useState (input value) for weekly schedule - day 6
//     //input: string
//   const [task6, setTask6] = useState<string>('');
//     //initializes the set todos useState (to-do list) for weekly schedule - day 6
//     //input: string; output: array of strings
//   const [todos6, setTodos6] = useState<string[]>([]);
//     //initializes the set task useState (input value) for weekly schedule - day 7
//     //input: string
//   const [task7, setTask7] = useState<string>('');
//     //initializes the set todos useState (to-do list) for weekly schedule - day 7
//     //input: string; output: array of strings
//   const [todos7, setTodos7] = useState<string[]>([]);


//   // Function to add a task for each day of the week
//   //input: string, setTask which is a function using useState for setting a task, setTask which is a function using useState for setting todos
//   //return: updated string array with added task
//   //WILL BE USED WHEN AN ADD BUTTON IS ACTIVATED
//   const addTodo = (task: string, setTask: React.Dispatch<React.SetStateAction<string>>, setTodos: React.Dispatch<React.SetStateAction<string[]>>) => {
//     //task.trim() just removes whitespacce, but this if statement just checks if the task input by the user is not empty/nothing
//     if (task.trim() !== '') {
//       //if the user did input something to add into the todo list then we set todos here
//       //prevTodos come first which is shown below and then task is added in the back of the array as shown
//       setTodos((prevTodos) => [...prevTodos, task]);
//       //then we reset setTask as empty because we already added that task so the add function is over
//       setTask('');
//     }
//   };


//   // Function to remove a task for each day of the week
//   //input: index which is of type number and the setTodos which is a setState function to set the states of the string array
//   //return: updated string array with removed task
//   //WILL BE USED WHEN AN REMOVE BUTTON IS ACTIVATED
//   const removeTodo = (index: number, setTodos: React.Dispatch<React.SetStateAction<string[]>>) => {
//     //filters through prevTodos to get to the specific index we want to remove and then change i to not equal an index anymore
//     setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
//   };

//   const [editMode, setEditMode] = useState(false);
  
//   return (
//     <div className= "weekly">

//       <div className="editButtonContainer">
//         {/* Button to toggle between view and edit modes */}
//         <button onClick={() => setEditMode(!editMode)}>
//           {editMode ? "View Schedule" : "Edit Schedule"}
//         </button>
//       </div>
//           {/* creates a table */}
//           <table>
//             {/* creates a row to add the names into */}
//             <tr className="tr-names">
//               {/* creates columns with each day of the week in it */}
//               <th>Monday</th>
//               <th>Tuesday</th>
//               <th>Wednesday</th>
//               <th>Thursday</th>
//               <th>Friday</th>
//               <th>Saturday</th>
//               <th>Sunday</th>
//             </tr>
//             {/* creates a new row to add the corresponding tasks into that match with the day of the week */}
//             <tr className="tr-week">
//               {/* maps all the tasks into the array */}
//               {[task1, task2, task3, task4, task5, task6, task7].map((task, dayIndex) => (
//                 <td key={dayIndex} className="td-week">
//                   <p></p>
//                   {/* onChange (BELOW) checks if the input box of the day of the week is being interacted with and if it is then we switch to that day and call our setTask function on it depending on what day it is*/}
//                   <div className="newheader">
//                     <input
//                       type="text"
//                       className="weekText"
//                       placeholder="type here"
//                       value={task}
//                       onChange={(inputEvent) => {
//                         switch (dayIndex) {
//                           case 0:
//                             //calls setTask function for Monday
//                             setTask1(inputEvent.target.value);
//                             break;
//                           case 1:
//                              //calls setTask function for Tuesday
//                             setTask2(inputEvent.target.value);
//                             break;
//                           case 2:
//                              //calls setTask function for Wednesday
//                             setTask3(inputEvent.target.value);
//                             break;
//                           case 3:
//                              //calls setTask function for Thursday
//                             setTask4(inputEvent.target.value);
//                             break;
//                           case 4:
//                              //calls setTask function for Friday
//                             setTask5(inputEvent.target.value);
//                             break;
//                           case 5:
//                              //calls setTask function for Saturday
//                             setTask6(inputEvent.target.value);
//                             break;
//                           case 6:
//                              //calls setTask function for Sunday
//                             setTask7(inputEvent.target.value);
//                             break;
//                           default:
//                             break;
//                         }
//                       }}
//                     />
//                     <button className="addBtn"
//                       //onClick checks if the button was pressed and then we can check what day index we are currently on to add the
//                       // task to the correct day
//                       onClick={() => {
//                         switch (dayIndex) {
//                           case 0:
//                             //calls addTodo function for Monday
//                             addTodo(task, setTask1, setTodos1);
//                             break;
//                           case 1:
//                             //calls addTodo function for Tuesday
//                             addTodo(task, setTask2, setTodos2);
//                             break;
//                           case 2:
//                             //calls addTodo function for Wednesday
//                             addTodo(task, setTask3, setTodos3);
//                             break;
//                           case 3:
//                             //calls addTodo function for Thursday
//                             addTodo(task, setTask4, setTodos4);
//                             break;
//                           case 4:
//                             //calls addTodo function for Friday
//                             addTodo(task, setTask5, setTodos5);
//                             break;
//                           case 5:
//                             //calls addTodo function for Saturday
//                             addTodo(task, setTask6, setTodos6);
//                             break;
//                           case 6:
//                             //calls addTodo function for Sunday
//                             addTodo(task, setTask7, setTodos7);
//                             break;
//                           default:
//                             break;
//                         }
//                       }}
//                     >
//                       {/* creates add button */}
//                       Add
//                     </button>
//                   </div>
//                   {/* ul creates an unordered list to add the todos to their corresponding dayIndex and then .map maps through 
//                   the todos of that current day to find the corresponding index to the todo*/}
//                   <ul>
//                     {[todos1,todos2,todos3,todos4,todos5,todos6,todos7,][dayIndex].map((todo, index) => (
//                       <li key={index}>
//                         {todo}
//                         <button className="deleteBtn"
//                           //then onClick (which happens when the user interacts with the remove button) calls the removeTodo function
//                           // for the specific day it is and the index's remove button that was pushed
//                           //so dayIndex gets us to the right day and index gets us to the right todo to remove
//                           onClick={() => {
//                             switch (dayIndex) {
//                               case 0:
//                                 //calls removeTodo function for Monday
//                                 removeTodo(index, setTodos1);
//                                 break;
//                               case 1:
//                                 //calls removeTodo function for Tuesday
//                                 removeTodo(index, setTodos2);
//                                 break;
//                               case 2:
//                                 //calls removeTodo function for Wednesday
//                                 removeTodo(index, setTodos3);
//                                 break;
//                               case 3:
//                                 //calls removeTodo function for Thursday
//                                 removeTodo(index, setTodos4);
//                                 break;
//                               case 4:
//                                 //calls removeTodo function for Friday
//                                 removeTodo(index, setTodos5);
//                                 break;
//                               case 5:
//                                 //calls removeTodo function for Saturday
//                                 removeTodo(index, setTodos6);
//                                 break;
//                               case 6:
//                                 //calls removeTodo function for Sunday
//                                 removeTodo(index, setTodos7);
//                                 break;
//                               default:
//                                 break;
//                             }
//                           }}
//                         >
//                           {/* creates remove Button */}
//                           Remove
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//               ))}
//             </tr>
            
//           </table>

//     </div>
//         );
//       }
  
//   export default WeeklySchedule;