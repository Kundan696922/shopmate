import React, { useState, useEffect } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import "./styles/App.css";

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("shopmate-items");
    return saved ? JSON.parse(saved) : [];
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("shopmate-items", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => setItems([...items, item]);

  const updateItem = (index, newItem) => {
    const updated = [...items];
    updated[index] = newItem;
    setItems(updated);
    setEditIndex(null);
  };

  const deleteItem = (index) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
    if (editIndex === index) setEditIndex(null);
  };

  const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="container py-5">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-center text-primary mb-4">🛒 ShopMate</h2>
        <ItemForm
          addItem={addItem}
          updateItem={updateItem}
          editItem={items[editIndex]}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
        />
        <ItemList
          items={items}
          setEditIndex={setEditIndex}
          deleteItem={deleteItem}
        />
        <div className="text-end fw-bold fs-5 text-success border-top pt-3 mt-3">
          Total Estimated: ₹{total.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default App;
