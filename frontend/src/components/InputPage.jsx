import React from 'react';
import { FaLevelDownAlt } from "react-icons/fa";

const InputPage = ({ inputText, handleInputChange, customHeader, customFooter, handleCustomChange }) => (
  <div className="section input-section">
    <div className="section-title">INPUT <FaLevelDownAlt /></div>
    <h4>ADD CUSTOM HEADER</h4>
    <div className="custom-inputs">
      <input
        type="text"
        name="customHeader"
        placeholder="USE {name} to add name and {order id} to add order id"
        value={customHeader}
        onChange={handleCustomChange}
      />
    </div>
    
    <h4>ADD CONTENT</h4>
    <textarea
      className="input-textarea"
      placeholder="Enter your text here"
      value={inputText}
      onChange={handleInputChange}
    />
    <h4>ADD CUSTOM FOOTER</h4>
    <input
      type="text"
      name="customFooter"
      placeholder="Custom Footer"
      value={customFooter}
      onChange={handleCustomChange}
    />
  </div>
);

export default InputPage;
