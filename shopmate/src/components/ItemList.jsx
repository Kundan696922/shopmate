import React from "react";

const ItemList = ({ items, setEditIndex, deleteItem, togglePurchased }) => (
  <ul className="list-group mb-4">
    {items.map((item, i) => (
      <li
        key={item.id}
        className={`list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center ${
          item.purchased ? "text-decoration-line-through text-muted" : ""
        }`}
      >
        <div>
          <strong>{item.name}</strong> [{item.category}] – ₹
          {item.price.toFixed(2)}
        </div>
        <div className="mt-2 mt-md-0">
          <button
            className="btn btn-sm btn-outline-success me-2"
            onClick={() => togglePurchased(item.id)}
          >
            {item.purchased ? "Undo" : "Purchased"}
          </button>
          <button
            className="btn btn-sm btn-outline-warning me-2"
            onClick={() => setEditIndex(i)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => deleteItem(item.id)}
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default ItemList;
