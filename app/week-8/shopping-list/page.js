"use client";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./item.json";
import { useState } from "react";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const [itemList, setItemList] = useState(
    itemsData.map((item) => ({ ...item }))
  );
  const [selectedItem, setSelectedItem] = useState("");
  const handleAddItem = (newItem) => {
    setItemList([...itemList, newItem]);
  };
  const handleSetSelectedItem = (item) => {
    console.log(item);
    let itemName = item
      .split(",")[0]
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      )
      .trim();
    console.log(itemName);
    setSelectedItem(itemName);
  };

  const { user } = useUserAuth();

  return (
    <main >
      {user ? (
        <div className="flex bg-black">
          <div className="flex-1">
            <h1 className="text-3xl text-green-600 font-extrabold text-center">
              Shopping List
            </h1>
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={itemList} onItemSelect={handleSetSelectedItem} />
          </div>
          <div className="flex-1">
            <MealIdeas ingredient={selectedItem} />
          </div>
        </div>
      ) : (
        <div>
          <p>You must be logged in to view this page</p>
          <Link href="/week8/">CLick here to return to sign in page</Link>
        </div>
      )}
    </main>
  );
}
