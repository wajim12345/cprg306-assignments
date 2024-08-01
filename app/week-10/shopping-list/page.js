"use client";
import ItemList from "./item-list";
import NewItem from "./new-item";
import { useEffect, useState } from "react";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
import { addItem, getItems } from "../_services/shopping-list-service";

export default function Page() {
  const [itemList, setItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const handleAddItem = async (newItem) => {
    try {
      await addItem(user.uid, newItem);
      setItemList((prevItems)=>[...prevItems, newItem]);
    } catch (error) {
      console.log("Error adding item: ", error);
    }
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

  const loadItems = async () => {
    if (user) {
      try {
        const fetchedItems = await getItems(user.uid);
        setItemList(Array.isArray(fetchedItems) ? fetchedItems : []);
      } catch (error) {
        console.log("Error loading items: ", error);
        setItemList([]); 
      }
    } else {
      console.log('No user authenticated.');
    }
  };
  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  return (
    <main>
      <header>
        <h1 className="text-3xl text-green-600 font-extrabold text-center">
          Shopping List
        </h1>
      </header>
      {user ? (
        <div className="flex bg-black">
          <div className="flex-1">
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
