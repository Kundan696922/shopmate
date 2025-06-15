import React from "react";

const ItemList = ({ items, setEditIndex, deleteItem }) => {
  return (
    <ul className="list-group mb-4">
      {items.map((item, index) => (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{item.name}</strong> – ₹{item.price.toFixed(2)}
          </div>
          <div>
            <button
              className="btn btn-sm btn-outline-warning me-2"
              onClick={() => setEditIndex(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => deleteItem(index)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
