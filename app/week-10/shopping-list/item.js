export default function Item({ item, onSelect }) {
  let { name, quantity, category } = item;

  return (
    <div
      onClick={() => onSelect(name)}
      className="border-4 border-purple-300 bg-black p-3 m-3 w-96 hover:bg-gray-700"
    >
      <h1 className="text-2xl text-green-600 font-bold">{name}</h1>
      <p className="text-xl text-green-300 font-semibold">
        Buy {quantity} in {category}
      </p>
    </div>
  );
}
