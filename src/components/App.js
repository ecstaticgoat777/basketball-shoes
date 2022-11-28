import React from 'react';
import { useState, useEffect } from 'react';
import shoeData from '../assets/shoe-data.json';
import shoeFilterData from '../assets/filter-group-info.json';
import '../css/App.css';
import '../css/Reset.css';
import ShoeItem from './ShoeItem';
import FavoritesList from './FavoritesList';
import Sort from './Sort';
import FilterCategory from './FilterCategory'


function App() {
  const [favs, setFavs] = useState([]);
  const [total, setTotal] = useState(0);
  const [allItems, setAllItems] = useState(shoeData);
  const [items, setItems] = useState(shoeData);
  const [filterData, setFilterData] = useState(shoeFilterData);
  const [sortType, setSortType] = useState("rating"); // default sort by rating/popular
  const [filters, setFilters] = useState([]);

  // for each item, loops through all the filters
  const getFilteredItems = (newFilters) => {
    if(newFilters.length == 0) {return allItems}
    let filteredItems = [];
    allItems.forEach(shoe => {
      let displayItem = true
      newFilters.forEach(f => {
        if (f.name.toLowerCase() === "favorites") {
          if (!favs.some(fav => fav.name == shoe.name))
            displayItem = false;
        } else if (!shoe[f.category.toLowerCase()].includes(f.name)) {
          displayItem = false;
        }})
      if (displayItem) {
        filteredItems.push(shoe);
      }
    })
    //setItems(filteredItems)
    return filteredItems;
  }

  // populates the 'filters' list with {filter name, filter category}
  const filterItems = (category, name) => {
    let newFilters = [...filters];
    if (newFilters.length != 0 && newFilters.some(f => f.name == name)) {
      newFilters = newFilters.filter(f => {return f.name !== name});
    } else {
      newFilters = [...filters, {name, category}];
    }
    setFilters(newFilters);
    setItems(getFilteredItems(newFilters));
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
  

  function Total() {
    if (favs.length != 0) {
      return <h2>Total: ${total.toFixed(2)}</h2>
    }
  }


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
            <div className="fav-bar">
              <div className="fav-heading">
                <h2>Favorites</h2>
              </div>
                <FavoritesList favList={favs}/>
                <br/>
                <div className="total">
                  <Total/>
                </div>
              </div>
          </div>
      </div>


      </div>
    </div>
  );
}

export default App;
