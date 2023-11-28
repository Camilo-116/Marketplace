import React from "react";

function SearchBar(props) {
  const onSubmit = (e) => {
    console.log(`Submit: ${e.target.value}`);
  };
  const onSelectedCategory = (e) => {
    e.target.style.color = "black";
    props.categoryCallback(e);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }
  const handleSubmit = (e) => {
    props.searchCallback(e);
  }

  return (
    <div className="search-bar">
      <div className="search-image">
        <img src="./shopping.png" alt="" />
      </div>
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search goods or services here..."
            onSubmit={onSubmit}
            onKeyDown={handleKeyDown}
          />
          <select
            className="search-categories"
            defaultValue="none"
            onChange={onSelectedCategory}
          >
            <option value="none">
              All Categories
            </option>
            <option value="Goods">Goods</option>
            <option value="Services">Services</option>
          </select>
          <button className="search-button" type="submit">Search Now!</button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
