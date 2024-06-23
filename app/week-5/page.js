import ItemList from "./item-list";

export default function Page(){
    return(
        <main>
            <h1 className="text-3xl text-green-600 font-extrabold text-center">Shopping List</h1>
            <ItemList />
        </main>
    );
}