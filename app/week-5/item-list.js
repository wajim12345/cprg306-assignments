"use client";
import { useState } from "react";
import Item from "./item";
import shoppingData from "./item.json";

export default function ItemList() {
  //create shoppingList from json
  let shoppingList = shoppingData.map((item) => ({ ...item }));
  //setup useState and handleSortBy
  const [sortBy, setSortBy] = useState("name");
  const handleSortBy = (event) => setSortBy(event.target.value);
  //create a function for sort to make code less redundant
  const myCustomSort = (a, b, sortByWhat = null) => {
    let itemA;
    let itemB;
    if (sortByWhat != null) {
      itemA = a[sortByWhat].toUpperCase();
      itemB = b[sortByWhat].toUpperCase();
    } else {
      itemA = a.toUpperCase();
      itemB = b.toUpperCase();
    }
    if (itemA < itemB) {
      return -1;
    }
    if (itemA > itemB) {
      return 1;
    }
    return 0;
  };
  //Check if sortBy === group
  if (sortBy === "group") {
    const categoryGroup = shoppingList.reduce((groupedCategory, item) => {
      const category = item.category;
      //check if category array already exist,
      if (groupedCategory[category] == null) {
        groupedCategory[category] = [];
      }
      //put the item into the category array
      groupedCategory[category].push(item);
      return groupedCategory;
    }, {});

    // Sort items within each category
    const sortedCategoryList = [];
    for (const category in categoryGroup) {
      //add category to sortedCategoryList for sorting later
      sortedCategoryList.push(category);
      //sort the items within each category by name
      categoryGroup[category].sort((a, b) => myCustomSort(a, b, "name"));
    }
    //sort the category list
    sortedCategoryList.sort((a, b) => myCustomSort(a, b));
    //map the two list together
    shoppingList = sortedCategoryList.map((category) => ({
      category,
      item: categoryGroup[category],
    }));
  } else {
    // Sort the shopping list by the selected criteria (name or category)
    shoppingList = shoppingList.sort((a, b) => myCustomSort(a, b, sortBy));
  }
  const buttonStyle =
    "flex-1 bg-blue-100 rounded  text-black m-5 hover:bg-blue-300 focus:bg-blue-700 focus:font-bold";
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex">
        <button className={buttonStyle} onClick={handleSortBy} value="name">
          Sort by Name
        </button>
        <button className={buttonStyle} onClick={handleSortBy} value="category">
          Sort by Category
        </button>
        <button className={buttonStyle} onClick={handleSortBy} value="group">
          Grouped Category
        </button>
      </section>
      <section>
        {sortBy === "group"
          ? shoppingList.map(({ category, item }) => (
              <div key={category}>
                <h2 className="capitalize text-2xl font-bold my-2 text-purple-700">
                  {category}
                </h2>
                {item.map((item) => (
                  <Item key={item.name} item={item} />
                ))}
              </div>
            ))
          : shoppingList.map((item) => <Item key={item.name} item={item} />)}
      </section>
    </div>
  );
}
