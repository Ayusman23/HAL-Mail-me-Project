import React from 'react';
import { FaDatabase } from "react-icons/fa";

const DataPage = ({ data, handleDataChange }) => (
  <div className="section data-section">
    <div className="section-title">DATA <FaDatabase /></div>
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={data.name}
      onChange={handleDataChange}
    />
    <input
      type="text"
      name="id"
      placeholder="ID"
      value={data.id}
      onChange={handleDataChange}
    />
    <input
      type="text"
      name="category"
      placeholder="Category"
      value={data.category}
      onChange={handleDataChange}
    />
  </div>
);

export default DataPage;
