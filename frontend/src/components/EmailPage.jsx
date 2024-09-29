import React from 'react';
import { FaMailBulk, FaCheck } from "react-icons/fa";

const EmailPage = ({ email, handleEmailChange, handleSendClick }) => (
  <div className="section email-section">
    <div className="section-title">EMAIL <FaMailBulk /></div>
    <input
      type="text"
      name="to"
      placeholder="To"
      value={email.to}
      onChange={handleEmailChange}
    />
    <input
      type="text"
      name="cc"
      placeholder="CC"
      value={email.cc}
      onChange={handleEmailChange}
    />
    <button className="send-button" onClick={handleSendClick}>SEND <FaCheck /></button>
  </div>
);

export default EmailPage;
