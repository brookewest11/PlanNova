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
  const [lists, setLists] = useState<ListItem[]>([]); // Explicitly annotate the type here
  const [numOfBoxes, setnumOfBoxes] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [newListName, setNewListName] = useState("");

  const [showListPopup, setListPopup] = useState(false);
  const [item, setItem] = useState("");
  const [selectedListIndex, setSelectedListIndex] = useState<string | number>("");

  const [showDeleteListPopup, setShowDeleteListPopup] = useState(false);

  const handleListItemClick = (listIndex: number) => {
    setSelectedListIndex(listIndex); // Set the selected list index
  };

  useEffect(() => {
    fetchUserLists();
  }, []);

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
      if (response.ok) {
        setLists(data.lists);
      } else {
        // Handle error
        console.error("Failed to fetch user lists:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user lists:", error);
    }
  };

  const handleAddToList = async () => {
    // Add itemToAdd to the selected list (selectedListIndex)
    if (selectedListIndex !== "" && item.trim() !== "") {
        try {
            const updatedLists = [...lists];
            updatedLists[Number(selectedListIndex)].items.push(item); // Cast selectedListIndex to a number here
            setLists(updatedLists);

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

            // Reset state variables
            setListPopup(false);
            setItem("");
            setSelectedListIndex("");

            // Log the response from the server
            console.log("Server Response:", data);
        } catch (error) {
            console.error("Error adding item to list:", error);
        }
    }
  };

  const handleDeleteFromList = async () => {
    if (selectedListIndex !== "" && item.trim() !== "") {
      try {
        const updatedLists = [...lists];
        const listIndex = Number(selectedListIndex);
        const updatedItems = updatedLists[listIndex].items.filter(listItem => listItem !== item); // Rename variable here
        updatedLists[listIndex].items = updatedItems;

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

        // Reset state variables
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

  const handleCreateNewList = async () => {
    if (lists.length >= 4) {
      // Display a warning notification to the user
      alert("You can only create a maximum of four lists.");
      return; // Exit the function
    }

    if (newListName.trim() !== "") {
      const newList = { title: newListName, items: [] };
    const updatedLists = [...lists, newList];

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
        setLists(updatedLists); // Update the local state with the new list
        setShowPopup(false);
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
        setLists(updatedLists); // Update the local state with the deleted list
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
             <img src={logopic} className="logopic_list" />
             <div className="logo_list">PlanNova</div>
           </div>
         </div>
         <div className="grid-item">
           {/* navigation bar for this page  */}
           <div className="nav-buttons">
            <Link to="/home" className="links" style={{ color: '#633a7d' }}>
               home
             </Link>
             <Link to="/list" className="links" style={{ color: '#7c3ba5' }}>
               lists
             </Link>
             <Link to="/meal-planning" className="links" style={{ color: '#8c4fb3' }}>
               meal planning
             </Link>
             <Link to="/fitness-tracker" className="links" style={{ color: '#be83e3' }}>
               fitness tracker
             </Link>
             <Link to="/" className="links" style={{ color: '#cda2e8' }}>
               logout
             </Link>
           </div>
         </div>
       </div>
       <hr className="line" />
       <div className="list-name">Lists</div>
       <button className="create-list-button" onClick={() => setShowPopup(true)}>
        + Create List
      </button>
      {showPopup && (
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
            <button className="cancel" onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
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
      {/* Render new lists */}
      {lists.map((list, index) => (
        <div key={index} className="grid-item2">
          <div className="List" onClick={() => handleListItemClick(index)}>
            <div className="list-text1">{list.title}</div>
            <div>
              {list.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <input type="checkbox" className="list-items" />
                  <div className="list-text">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      </div>
      {selectedListIndex !== "" && !showDeleteListPopup && (
      <div className="popup"> {/* Add your popup styling */}
        <div className="popup-content">
          <h2>add or delete items from list</h2>
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