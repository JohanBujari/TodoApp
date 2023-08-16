import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [list] = useState([
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
        {filteredList.map((item) => (
          <li key={item} className="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
