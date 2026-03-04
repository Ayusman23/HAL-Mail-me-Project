import React from 'react';
import { FaUsersViewfinder } from "react-icons/fa6";

const PreviewPage = ({ preview }) => (
  <div className="section preview-section">
    <div className="section-title">PREVIEW <FaUsersViewfinder /></div>
    <div className="preview-box">
      <p><strong>Name:</strong> {preview.name}</p>
      <p><strong>ID:</strong> {preview.id}</p>
      <p><strong>Category:</strong> {preview.category}</p>
      <div className="preview-text">
        <p>{preview.text.split('\n').map((line, index) => (
          <span key={index}>{line}<br /></span>
        ))}</p>
      </div>
      <p><strong>To:</strong> {preview.to}</p>
      <p><strong>CC:</strong> {preview.cc}</p>
    </div>
  </div>
);

export default PreviewPage;
