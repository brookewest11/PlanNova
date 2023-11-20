import React, { useState } from 'react';
import "./fitnessSearch.css";


//This whole file is in charge of creating the search bar which will then be used in the FitnessTracker page

//defines the values used in a specific workout which includes the name of the workout which is a string
// and the component of a workout which is also a string
interface Workout {
  name: string;
  component: string;
}


//this defines the prop type as workout to be used for the function that called it
//since we will want to use the elements of a workout to be displayed in the fitness tracker function that calls this 
interface SearchBarProps {
  onSelectWorkout: (workout: Workout) => void; 
}


//SearchBar function (React.FC just brings in functional component from react)
//creates the function used to create a weekly schedule using typescript jsx and react use states
function SearchBar({ onSelectWorkout }: SearchBarProps) {
  
  //initializes the state of the search bar specifically the input portion which would be the text bar
  //it originally sets it as an empty string 
  const [searchInput, setSearchInput] = useState<string>("");
  //initializes the state of the selected workout to be an empty string so we aren't displaying any information that we don't
  //want to include
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);


  //initializes array called workouts and adds the corresponding name of the workout and then its component which includes
  // the elements in which you would want to keep track of for that specific workout
  const workouts = [
    { name: "running", component: "mileage: , pace: , run type: " },
    { name: "walking", component: "mileage: , pace: " },
    { name: "biking", component: "mileage: , pace: " },
    { name: "hiking", component: "mileage: , pace: " },
    { name: "swimming", component: "distance: , pace: " },
    { name: "lifting", component: "type: , reps: , notes: " },
  ];
  
  // Replace each comma with a new line and remove trailing commas
  workouts.forEach((workout) => {
    workout.component = workout.component.replace(/, /g, "\n")
  });

  //this handles if there is an input event where the user were to start typing into the search bar
  const handleChange = (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
    //this prevents the default event from happening when an input event occurs so that way we can create our specific event below
    inputEvent.preventDefault();
    //our event we want to create is to set the search bar input value as a new value which would be the user's input
    setSearchInput(inputEvent.target.value);
  };

  //handles the event in which a workout is clicked so that it can be added into its corresponding textbox in the fitness tracker page
  const handleWorkoutClick = (workout: Workout) => {
    //sets the selected workout so we know which one we are going to add
    setSelectedWorkout(workout.name);
    // passes the workout variable to the function that called it (which is in fitness tracker so we can update our textboxes in ther)
    onSelectWorkout(workout); 
  };


  //checks if the user input string length is greater than 0 (which would mean they didn't enter an input)
  //if it is greater than zero then we filter through the workouts array to find the specific workour name that matches
  //if it does match then the search bar will display every value in the workouts array that matches the input
  //if there is nothing that matches it will return no values 
  const filteredWorkouts = searchInput.length > 0
    ? workouts.filter((workout) => workout.name.match(searchInput))
    : workouts;


  //html code that sets up formatting of our page
  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search here"
        //onChange is our event handler
        onChange={handleChange}
        //value is our input value that we will search with
        value={searchInput}
        className="search-input"
      />
      {
      // this part below creates the table with all of our values from the workouts array that we created above
      //and then uses the filteredWorkouts function 
      //if the length is greater than zero then we add each workout into the table that matches the search input  
      }
      {filteredWorkouts.length > 0 ? (
        <table className="tbl">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {/* iterates over each workout, the key and index values are used to correctly update the values
            being handled, the handleOnClick allows us to export the workout value to the textbox to be used
            later to store past workouts */}
            {filteredWorkouts.map((workout, index) => (
              <tr key={index} onClick={() => handleWorkoutClick(workout)}>
                <td>{workout.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        //if no results were found then we return "No results found."
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchBar;


