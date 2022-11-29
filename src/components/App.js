import React from 'react';
import { useState, useEffect } from 'react';
import shoeData from '../assets/shoe-data.json';
import shoeFilterData from '../assets/filter-group-info.json';
import '../css/App.css';
import '../css/Reset.css';
import ShoeItem from './ShoeItem';
import Sort from './Sort';
import FilterCategory from './FilterCategory'
import Aggregator from './Aggregator';


function App() {
  const [favs, setFavs] = useState([]);
  const [total, setTotal] = useState(0);
  const [allItems, setAllItems] = useState(shoeData);
  const [items, setItems] = useState(shoeData);
  const [filterData, setFilterData] = useState(shoeFilterData);
  const [sortType, setSortType] = useState("rating"); // default sort by rating/popular
  const [filters, setFilters] = useState([]);

  
  const filterCategory = (newFilters, shoe, c) => {
    let currentFilters = newFilters.filter(f => {return f.category == c});
    for (let i=0; i < currentFilters.length; i++) {
      let f = currentFilters[i];
      if (f.name.toLowerCase() === "favorites") {
        if (favs.some(fav => fav.name == shoe.name)) {
          return true;
        } 
        return false;
      }

      if (shoe[c.toLowerCase()].includes(f.name)) {
        return true;
      }
    }
    return false;
  }
  
  const getFilteredItems = (newFilters, newCategories) => {
    if(newFilters.length == 0) {return allItems}
    let filteredItems = [];
    allItems.forEach(shoe => {
      let displayItem = true
      const res = [];
      for (let j=0; j < newCategories.length; j++) {
        let c = newCategories[j];
        let bool = filterCategory(newFilters, shoe, c);
        res.push(bool);
      }
      if (res.includes(false)) {
        displayItem = false;
      }

      if (displayItem) {
        filteredItems.push(shoe);
      }
    })
    return filteredItems;
  }

  const filterItems = (category, name) => {
    // populates the 'filters' list with {filter name, filter category}
    let newFilters = [...filters];
    if (newFilters.length != 0 && newFilters.some(f => f.name == name)) {
      newFilters = newFilters.filter(f => {return f.name !== name});
    } else {
      newFilters = [...filters, {name, category}];
    }
    setFilters(newFilters);

    // update categories
    let newCategories = []
    for (let i=0; i < newFilters.length; i++) {
      let category = newFilters[i].category
      if (newCategories.length == 0 || !newCategories.includes(category)) {
          newCategories = [...newCategories, category]
        }
    }
    setItems(getFilteredItems(newFilters, newCategories));
  }

  const createFilterCategory = (groupInfo) => {
    return <FilterCategory key={groupInfo.title} title={groupInfo["title"]} options={groupInfo["options"]} filterItems={filterItems} filterList={filters} />
  }

  const filterGroups = filterData.map(createFilterCategory);

  useEffect(() => {
    const toggleSort = type => {
      let sortedItems = [...items]
      if (type === "price") {
        sortedItems = [...items].sort((a, b) => {
          return a[type] - b[type];
        })
      } else if (type === "rating") {
        sortedItems = [...items].sort((a, b) => {
          return b[type] - a[type];
        })
      }
      setItems(sortedItems);
    }
    toggleSort(sortType);
  }, [sortType, filters]);
  
  
  const toggleFavs = (item) => {
    let newFavs = [...favs]
    const itemIndex = newFavs.findIndex(e => e.name === item.name);
    if (itemIndex !== -1) {
      // fav exists -> remove from fav list 
      newFavs.splice(itemIndex, 1);
      setTotal(total - item.price); // decrement total

      // if filtering by favs and item is no longer a fav, remove it from items
      if (filters.some(filt => filt.name == "Favorites")) {
        const copyItems = [...items];
        const itemLoc = copyItems.findIndex(i => i.name === item.name )
        copyItems.splice(itemLoc, 1);
        setItems(copyItems);
      }
    } else {
      // fav does not exist -> add to fav list
      newFavs = ([...newFavs, {key: item, name: item.name, price: item.price}]);
      setTotal(total + item.price); // increment total
    }
    setFavs(newFavs); // update favs
  }

  const visibleItems = items.map((item, index) => (
    <ShoeItem key={index} shoe={item} handleFavs={toggleFavs} favState={favs.some(f => f.name == item.name)} items={items} />))

const reset = () => {
  setFilters([]);
  setItems(allItems);
}

  return (
    <div className="App">
      <div className="wrapper">
        <h1 className="heading">sneaker central</h1>
        <div className="shoe-body">

          <div className="bar">
            <div className="side-bar">
              <Sort setSortType={setSortType}/>
              {filterGroups}
              <button className="reset" onClick={reset}>Reset Filters</button>
            </div>
          </div>

          <div className="shoe-gallery">
            <div className="ShoeList">
              {visibleItems}
            </div>
          </div>

          <div>
            <Aggregator favs={favs} total={total}/>
          </div>
      </div>
      </div>
    </div>
  );
}

export default App;
