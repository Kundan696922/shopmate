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

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setPrice(editItem.price);
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || isNaN(price) || Number(price) <= 0) {
      alert("Enter a valid name and a positive price.");
      return;
    }
    const newItem = { name, price: parseFloat(price) };
    editIndex !== null ? updateItem(editIndex, newItem) : addItem(newItem);
    setName("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 mb-4">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="col-md-4">
        <input
          type="number"
          className="form-control"
          placeholder="Estimated Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="col-md-3 d-grid">
        <button className="btn btn-primary">
          {editIndex !== null ? "Update" : "Add"} Item
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
