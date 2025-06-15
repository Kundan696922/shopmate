import React, { useState, useEffect } from "react";

const ItemForm = ({
  addItem,
  updateItem,
  editItem,
  editIndex,
  setEditIndex,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setPrice(editItem.price);
      setCategory(editItem.category || "");
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || isNaN(price) || Number(price) <= 0) {
      return alert("Enter valid name and price");
    }
    const item = {
      id: editItem?.id || crypto.randomUUID(),
      name,
      price: parseFloat(price),
      category,
      purchased: editItem?.purchased || false,
    };
    editIndex != null ? updateItem(editIndex, item) : addItem(item);
    setName("");
    setPrice("");
    setCategory("");
    setEditIndex(null);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2 mb-4">
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option>Groceries</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Other</option>
        </select>
      </div>
      <div className="col-md-2 d-grid">
        <button className="btn btn-primary">
          {editIndex != null ? "Update" : "Add"} Item
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
