import React, { useState, useEffect } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import "./styles/App.css";

function App() {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("shopmate-items")) || []
  );
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("shopmate-dark") === "true"
  );
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    localStorage.setItem("shopmate-items", JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    localStorage.setItem("shopmate-dark", darkMode);
  }, [darkMode]);

  const addItem = (item) => setItems([...items, item]);
  const updateItem = (idx, itm) => {
    const updated = [...items];
    updated[idx] = itm;
    setItems(updated);
    setEditIndex(null);
  };

  const deleteItem = (id) => setItems(items.filter((item) => item.id !== id));

  const togglePurchased = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const exportCSV = () => {
    const header = ["id", "name", "price", "category", "purchased"];
    const rows = items.map((i) =>
      [i.id, i.name, i.price, i.category, i.purchased].join(",")
    );
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shopmate_items.csv";
    a.click();
  };

  const importCSV = (e) => {
    const fr = new FileReader();
    fr.onload = () => {
      const [header, ...rows] = fr.result.trim().split("\n");
      const newItems = rows.map((r) => {
        const [id, name, price, category, purchased] = r.split(",");
        return {
          id: id || crypto.randomUUID(),
          name,
          price: parseFloat(price),
          category,
          purchased: purchased === "true",
        };
      });
      setItems(newItems);
    };
    fr.readAsText(e.target.files[0]);
  };

  const filtered = items
    .filter((item) => !filterCategory || item.category === filterCategory)
    .sort((a, b) =>
      sortBy === "price"
        ? a.price - b.price
        : sortBy === "name"
        ? a.name.localeCompare(b.name)
        : 0
    );

  const total = filtered.reduce(
    (sum, i) => sum + (i.purchased ? 0 : i.price),
    0
  );

  return (
    <div className={`app-wrapper ${darkMode ? "dark" : ""}`}>
      <div className="container p-3 rounded shadow-lg bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
          <h2 className="text-primary">🛒 ShopMate</h2>
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              id="darkMode"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label className="form-check-label" htmlFor="darkMode">
              Dark Mode
            </label>
          </div>
        </div>

        <ItemForm
          addItem={addItem}
          updateItem={updateItem}
          editItem={items[editIndex]}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
        />

        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <select
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option>Groceries</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-md-6 mb-2">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>

        <ItemList
          items={filtered}
          setEditIndex={setEditIndex}
          deleteItem={deleteItem}
          togglePurchased={togglePurchased}
        />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 border-top pt-3 mt-3">
          <div className="fw-bold text-success fs-5">
            Total: ₹{total.toFixed(2)}
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={exportCSV}
            >
              Export CSV
            </button>
            <label className="btn btn-outline-secondary btn-sm mb-0">
              Import CSV
              <input type="file" accept=".csv" hidden onChange={importCSV} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
