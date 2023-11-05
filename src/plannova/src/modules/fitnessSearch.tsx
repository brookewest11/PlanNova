import React, { useState } from 'react';
import "./fitnessSearch.css";


//This whole file is in charge of creating the search bar which will then be used in the FitnessTracker page

//SearchBar function (React.FC just brings in functional component from react)
const SearchBar: React.FC = () => {

  //initializes the state of the search bar specifically the input portion which would be the text bar
  //it originally sets it as an empty string 
  const [searchInput, setSearchInput] = useState<string>("");
  
  //initializes array called workouts and adds the corresponding name of the workout and then its component which is "type"
  const workouts = [{ name: "running", component: "type" },{ name: "walking", component: "type" },{ name: "biking", component: "type" },{ name: "hiking", component: "type" },{ name: "swimming", component: "type" },{ name: "lifting", component: "type" },];

  //this handles if there is an input event where the user were to start typing into the search bar
  const handleChange = (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
    //this prevents the default event from happening when an input event occurs so that way we can create our specific event below
    inputEvent.preventDefault();
    //our event we want to create is to set the search bar input value as a new value which would be the user's input
    setSearchInput(inputEvent.target.value);
  };

  //checks if the user input string length is greater than 0 (which would mean they didn't enter an input)
  //if it is greater than zero then we filter through the workouts array to find the specific workour name that matches
  //if it does match then the search bar will display every value in the workouts array that matches the input
  //if there is nothing that matches it will return no values 
  const filteredWorkouts = searchInput.length > 0 ? workouts.filter((workout) => workout.name.match(searchInput)) : workouts;

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
        // this part below creates the table with all of our values from the workouts array that we created above
        //and then uses the filteredWorkouts function 
        />
        {filteredWorkouts.length > 0 ? (
        <table className="tbl">
        <thead>
        <tr></tr>
        </thead>
        <tbody>
            {filteredWorkouts.map((workout, index) => (
            <tr key={index}>
            <td>{workout.name}</td></tr>
            ))}
        </tbody></table> ) : (
        //if no results were found then we return "No results found."
        <p>No results found.</p>
        )}
        </div>
    );
};

export default SearchBar;


