import React from 'react';

const TemplatePage = ({ handleTemplateClick }) => (
  <div className="section template-section">
    <div className="section-title">TEMPLATE</div>
    <div className="template-boxes">
      <div className="template-box" onClick={() => handleTemplateClick('NEWS')}>
        NEWS <br />
      </div>
      <div className="template-box" onClick={() => handleTemplateClick('OFFER')}>
        OFFER <br />
      </div>
      <div className="template-box" onClick={() => handleTemplateClick('INVITATION')}>
        INVITATION <br />
      </div>
      <div className="template-box" onClick={() => handleTemplateClick('WELCOME')}>
        WELCOME <br />
      </div>
      <div className="template-box" onClick={() => handleTemplateClick('PROMOTIONAL')}>
        PROMOTIONAL <br />
      </div>
    </div>
  </div>
);

export default TemplatePage;
