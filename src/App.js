import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [list, setList] = useState([
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Helen",
    "Isaac",
    "Jack",
  ]);
  const [filterValues, setFilterValues] = useState([]);
  const [input, setInput] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleFilterChange = (event) => {
    const options = event.target.options;
    const values = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFilterValues(values);
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSelect = (event, item) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedItems((prevSelected) => [...prevSelected, item]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedList = list.filter((item) => !selectedItems.includes(item));
    setList(updatedList);
    setSelectedItems([]);
  };
  
  const filteredItems = () => {
    return list
      .filter((item) =>
        filterValues.length === 0 ? item : filterValues.includes(item)
      )
      .filter((item) =>
        input ? item.toLowerCase().includes(input.toLowerCase()) : item
      );
  };

  const filteredList = filteredItems();

  const onClick = () => {
    setFilterValues([]);
    setInput("");
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Filter and Search List</h1>
      <div className="filter-container">
        <select
          multiple
          onChange={handleFilterChange}
          className="filter-select"
        >
          {list.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          value={input}
          onChange={handleInput}
          className="filter-input"
          placeholder="Search"
        />
      </div>
      <ul className="item-list">
        {selectedItems.length > 0 && (
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        )}

        {filteredList.map((item, index) => (
          <li key={item} className="item">
            <input
              type="checkbox"
              checked={selectedItems[index]}
              onChange={(e) => handleSelect(e, item)}
            />
            {item}
          </li>
        ))}
      </ul>
      {(filterValues.length > 0 || input.length > 0) && (
        <button onClick={onClick}>Clear filters</button>
      )}
    </div>
  );
}

export default App;
