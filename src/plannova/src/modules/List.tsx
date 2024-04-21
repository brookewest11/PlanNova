// Name: List
// Purpose / what code does: This component represents a list management interface where users can create, edit, and delete lists along with their items.
// Programmers: Gabi Kruger, Brooke West, Emily Proctor, Kenadi Krueger, Nathan Mignot
// Date created: 10/10/2023
// Date revised: 4/21/2024
  // Major Revisions:
    // Date: 10/10/2023, Author: Brooke West
      // Modification: The router at top of page was created with working links to other pages in application.
    // Date: 10/22/2023, Author: Emily Proctor
      // Modification: Logo holder (simple star) was added at top of page.
    // Date: 11/2/2023, Author: Nathan Mignot
      // Modification: Frontend was initiated and can view multiple lists. Harded coded items.
    // Date: 11/19/2023, Author: Nathan Mignot
      // Modification: Added checkboxes for each list item in an array. 
    // Date: 2/5/2024, Author: Emily Proctor
      // Modification: Add, delete, and modify each list. Buttons created for each of these functionalities. Can add/remove items from each list and include name for list.
    // Date: 2/7/2024, Author: Emily Proctor
      // Modification: List backend. Connects user id with their own list and list items stored in backend.
    // Date: 2/24/2024, Author: Gabi Kruger
      // Modification: CSS updates.
    // Date: 3/28/2024, Author: Emily Proctor
      // Modification: Logo and navigation bar updated to be consistent across all pages.
    // Date: 4/8/2024, Author: Gabi Kruger
      // Modification: Button frontend updates.
    // Date: 4/21/2024, Author: Emily Proctor
      // Modification: Updated comments.
// Preconditions: The user must be logged in.
  // Acceptable inputs: Valid list names and list items.
  // Unacceptable inputs: Empty list names and list items.
// Postconditions: Lists and their items can be created, edited, and deleted.
  // Return values: None explicitly returned. The component renders UI elements.
// Error and exception condition values: Errors are logged to the console if there are issues with fetching, creating, updating, or deleting lists.
// Side Effects
  // State Updates: Changes to state variables
  // Network Requests: HTTP requests
  // Popup Display
// Invariants
  // UI Consistency (logo, navigation bar, buttons, etc.)
  // Maximum List Limit of 4 lists

import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect from react package
import "./List.css"; // CSS styling
import { Link } from "react-router-dom"; // Ability to link to other pages
import logopic from "./logostars2.png"; // Logo image

declare module "*.png"; // Allows import of PNG files

// defines what a single List element consists of including a title and items
interface ListItem {
  title: string;
  items: string[];
}

function List() {
  // hold the list content
  const [lists, setLists] = useState<ListItem[]>([]);
  // popup for creating list
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  // handles setting a new list with associated name
  const [newListName, setNewListName] = useState("");
  // handles popup for editing list items
  const [showListPopup, setListPopup] = useState(false);
  // holds list item
  const [item, setItem] = useState("");
  // holds current list index
  const [selectedListIndex, setSelectedListIndex] = useState<string | number>("");
  // handles popup for deleting a list
  const [showDeleteListPopup, setShowDeleteListPopup] = useState(false);

  // called if a list item is clicked
  const handleListItemClick = (listIndex: number) => {
    setSelectedListIndex(listIndex);
  };

  // fetches specific user lists based on user
  useEffect(() => {
    fetchUserLists();
  }, []);

  // function for fetching specific user lists based on user
  const fetchUserLists = async () => {
    try {
      // Attempt to retrieve list information from backend 
      const response = await fetch("http://localhost:5000/get-user-lists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
      const data = await response.json();
      // if fetch is successful
      if (response.ok) {
        // set the current list with list stored in backend for user
        setLists(data.lists);
      // if fetch is not successful
      } else {
        // Push error to console
        console.error("Failed to fetch user lists:", data.error);
      }
    } catch (error) {
      // Push error to console
      console.error("Error fetching user lists:", error);
    }
  };

  // adds item to a list and updates backend
  const handleAddToList = async () => {
    if (selectedListIndex !== "" && item.trim() !== "") {
        try {
            // grabs the current list
            const updatedLists = [...lists];
            // Pushes the new item to specific list
            updatedLists[Number(selectedListIndex)].items.push(item);
            // updates lists
            setLists(updatedLists);

            // send the updated list to the backend
            const response = await fetch("http://localhost:5000/update-lists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lists: updatedLists }),
                credentials: 'include',
            });

            const data = await response.json();
            
            // Reset states and close popup after updating
            setListPopup(false);
            setItem("");
            setSelectedListIndex("");
            // Push response to console
            console.log("Server Response:", data);
        } catch (error) {
            // Push error to console
            console.error("Error adding item to list:", error);
        }
    }
  };

  // deletes item from a list
  const handleDeleteFromList = async () => {
    if (selectedListIndex !== "" && item.trim() !== "") {
      try {
        // gets current list, gets list index, removes item from list, and updates lists
        const updatedLists = [...lists];
        const listIndex = Number(selectedListIndex);
        const updatedItems = updatedLists[listIndex].items.filter(listItem => listItem !== item); 
        updatedLists[listIndex].items = updatedItems;

        // send the updated list to the backend
        const response = await fetch("http://localhost:5000/update-lists", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ lists: updatedLists }),
          credentials: 'include',
        });

        const data = await response.json();

        // Reset states and close popup after updating
        setLists(updatedLists);
        setListPopup(false);
        setItem("");
        setSelectedListIndex("");
        
        // Push response to console
        console.log("Server Response:", data);
      } catch (error) {
        // Push error to console
        console.error("Error deleting item to list:", error);
      }
    }
  };

  // creates a new list
  const handleCreateNewList = async () => {
    // only allow user to create four lists
    if (lists.length >= 4) {
      alert("You can only create a maximum of four lists.");
      return;
    }

    // adds a new list and list title to current lists
    if (newListName.trim() !== "") {
      const newList = { title: newListName, items: [] };
    const updatedLists = [...lists, newList];

    try {
      // send the updated list to the backend
      const response = await fetch("http://localhost:5000/update-lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lists: updatedLists }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        // Reset states and close popup after updating
        setLists(updatedLists);
        setShowCreatePopup(false);
        setNewListName("");
        // Push response to console
        console.log("Server Response:", data);
      } else {
        // Push error to console
        console.error("Failed to create new list:", data.error);
      }
    } catch (error) {
      // Push error to console
      console.error("Error creating new list:", error);
    }
    }
  };

  // Deletes a specific list
  const handleDeleteList = async () => {
    if (selectedListIndex !== "") {
      const updatedLists = lists.filter((_, index) => index !== Number(selectedListIndex));

    try {
      // Send the updated list to the backend
      const response = await fetch("http://localhost:5000/update-lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lists: updatedLists }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        // Reset states and close popup after updating
        setLists(updatedLists);
        setSelectedListIndex("");
        setShowDeleteListPopup(false);
        // Push response to console
        console.log("Server Response:", data);
      } else {
        // Push error to console
        console.error("Failed to delete list:", data.error);
      }
    } catch (error) {
      // Push error to console
      console.error("Error deleting list:", error);
    }
    }
  };

  return (
    <>
      <div className="grid-container">
         <div className="grid-item">
           {/* handles title and logo image */}
           <div className="logo_container_list">
             <img src={logopic} className="logopic_list" />
             <div className="plannnova" style={{ color: 'black' }}>PlanNova</div>
           </div>
         </div>
         <div className="grid-item">
           {/* navigation bar */}
           <div className="nav-buttons">
             <Link to="/meal-planning" className="links" style={{ color: '#633a7d' }}>
               meal planning
             </Link>
             <Link to="/fitness-tracker" className="links" style={{ color: '#633a7d' }}>
               fitness tracker
             </Link>
             <Link to="/list" className="links" style={{ color: '#633a7d' }}>
               lists
             </Link>
             <Link to="/home" className="links" style={{ color: '#633a7d' }}>
               home
             </Link>
             <Link to="/" className="links" style={{ color: '#633a7d' }}>
               logout
             </Link>
           </div>
         </div>
       </div>

       <hr className="line" style={{ color: '#633a7d' }} />
       <div className="list-name">Lists</div>
       {/* create list button and popup functionality */}
       <button className="create-list-button" onClick={() => setShowCreatePopup(true)}>
        + create list
      </button>
      {showCreatePopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="enter-list-name-title">Enter List Name</div>
            <input
              type="text"
              placeholder="List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <button className="create-list" onClick={handleCreateNewList}>Create List</button>
            <button className="cancel" onClick={() => setShowCreatePopup(false)}>Cancel</button>
          </div>
        </div>
      )}
      {/* delete list button and popup functionality */}
      <button className="delete-list-button" onClick={() => setShowDeleteListPopup(true)}>
        - delete list
      </button>
      {showDeleteListPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="delete-list-title">Delete List</div>
            <select
              value={selectedListIndex}
              onChange={(e) => setSelectedListIndex(e.target.value)}
              className="dropdown"
            >
              <option value="">Select List</option>
              {lists.map((list, index) => (
                <option key={index} value={index}>{list.title}</option>
              ))}
            </select>
            <button className="delete-list" onClick={handleDeleteList}>Delete List</button>
            <button className="cancel" onClick={() => setShowDeleteListPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="grid-container2">
      {/* renders lists */}
      {lists.map((list, index) => (
        <div key={index} className="grid-item2">
          <div className="List" onClick={() => handleListItemClick(index)}>
            <div className="list-title">{list.title}</div>
            <div>
              {list.items.map((item, itemIndex) => (
                <div key={itemIndex} className="total-list-text1">
                  <div className="bullet"></div>
                  <div className="list-text">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      </div>
      {/* edit list items functionality */}
      {selectedListIndex !== "" && !showDeleteListPopup && (
      <div className="popup">
        <div className="popup-content">
          <div className="edit-list-items-text"> Edit List Items</div>
          <input
            type="text"
            placeholder="Item Name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button className="add-to-list" onClick={handleAddToList}>Add to List</button>
          <button className="delete-from-list" onClick={handleDeleteFromList}>Delete from List</button>
          <button className="cancel" onClick={() => setSelectedListIndex("")}>Cancel</button>
        </div>
      </div>
    )}
    </>
  );
}

export default List;