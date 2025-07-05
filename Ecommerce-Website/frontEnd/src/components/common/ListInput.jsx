import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

import "../../styles/common/ListInput.css";

const ListInput = ({ data, setData, isKeyValue = true, label = "Add Item"}) => {
  const [input, setInput] = useState("");

  const isValidInput = (str) => {
    if (isKeyValue) {
      const pattern = /^[A-Za-z0-9\s]+:\s?[A-Za-z0-9\s]+$/;
      return pattern.test(str);
    }
    return str.trim().length > 0;
  };

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!isValidInput(trimmed)) {
      alert(
        isKeyValue
          ? "Invalid format. Use format like: Size: M or Color: Red"
          : "Value cannot be empty"
      );
      return;
    }
    if (!data.includes(trimmed)) {
      setData([...data, trimmed]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  return (
    <div className="list-input-section">
      <div
        className={`form-group floating-label list-input ${
          input ? "has-value" : ""
        }`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control"
          id="listInput"
          placeholder=" "
        />
        <label htmlFor="listInput">{label}</label>
        <button
          type="button"
          onClick={handleAdd}
          className="add-btn"
          disabled={!input.trim()}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      {data.length > 0 && (
        <div className="listing-list">
          {data.map((item, index) => {
            const [key, value] = item.split(":").map((s) => s.trim());
            return (
              <div key={index} className=" list-item">
                {isKeyValue ? (
                  <>
                    <span className="key">{key}</span>:{" "}
                    <span className="value">{value}</span>
                  </>
                ) : (
                  <span className="value">{item}</span>
                )}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListInput;
