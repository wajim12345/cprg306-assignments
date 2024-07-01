"use client"
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./item.json";
import { useState } from "react";

export default function Page(){
    const [itemList, setItemList] = useState(itemsData.map((item) => ({ ...item })));
    const handleAddItem = (newItem)=>{
        setItemList([...itemList, newItem]);
    };
    
    return(
        <main>
            <h1 className="text-3xl text-green-600 font-extrabold text-center">Shopping List</h1>
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={itemList} />
        </main>
    );
}