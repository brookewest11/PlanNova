import React, { useState, useEffect } from "react";
import "./List.css";
import { Link } from "react-router-dom";
import logopic from "./logostars.png";

declare module "*.png"; //needed for logos

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
      const response = await fetch("http://localhost:5000/get-user-lists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
      const data = await response.json();
      // if success
      if (response.ok) {
        // set the current list with list stored in backend for user
        setLists(data.lists);
      } else {
        // Handle error
        console.error("Failed to fetch user lists:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user lists:", error);
    }
  };

  // adds item to a list and updates backend
  const handleAddToList = async () => {
    if (selectedListIndex !== "" && item.trim() !== "") {
        try {
            // grabs the current list
            const updatedLists = [...lists];
            // pushes the new item to specific list
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

            setListPopup(false);
            setItem("");
            setSelectedListIndex("");

            console.log("Server Response:", data);
        } catch (error) {
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

        setLists(updatedLists);
        setListPopup(false);
        setItem("");
        setSelectedListIndex("");
        

        console.log("Server Response:", data);
      } catch (error) {
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
        setLists(updatedLists);
        setShowCreatePopup(false);
        setNewListName("");
        console.log("Server Response:", data);
      } else {
        console.error("Failed to create new list:", data.error);
      }
    } catch (error) {
      console.error("Error creating new list:", error);
    }
    }
  };

  // deletes a specific list
  const handleDeleteList = async () => {
    if (selectedListIndex !== "") {
      const updatedLists = lists.filter((_, index) => index !== Number(selectedListIndex));

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
        setLists(updatedLists);
        setSelectedListIndex("");
        setShowDeleteListPopup(false);
        console.log("Server Response:", data);
      } else {
        console.error("Failed to delete list:", data.error);
      }
    } catch (error) {
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
           <img src={logopic} className="logopic_home" style={{ filter: 'brightness(50%) saturate(0%)' }} />
             <div className="logo_list">PlanNova</div>
           </div>
         </div>
         <div className="grid-item">
           {/* navigation bar */}
           <div className="nav-buttons">
             <Link to="/meal-planning" className="links" style={{ color: '#8c4fb3' }}>
               meal planning
             </Link>
             <Link to="/fitness-tracker" className="links" style={{ color: '#be83e3' }}>
               fitness tracker
             </Link>
             <Link to="/home" className="links" style={{ color: '#633a7d' }}>
               home
             </Link>
             <Link to="/" className="links" style={{ color: '#cda2e8' }}>
               logout
             </Link>
           </div>
         </div>
       </div>
       <hr className="line" />
       <div className="list-name">Lists</div>
       {/* create list button and popup functionality */}
       <button className="create-list-button" onClick={() => setShowCreatePopup(true)}>
        + Create List
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
        - Delete List
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