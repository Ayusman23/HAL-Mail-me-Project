import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5001/api/emails/getemails', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmails(response.data);
        const currentUser = localStorage.getItem('email');
        setCurrentUser(currentUser);
      } catch (error) {
        console.error('Failed to fetch emails:', error);
      }
    };

    fetchEmails();
    document.body.style.backgroundColor = '#000';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const containerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontFamily: 'cursive',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontFamily: 'cursive', 
  };

  const thStyle = {
    borderBottom: '2px solid #555',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#444',
  };

  const tdStyle = {
    borderBottom: '1px solid #555',
    padding: '10px',
  };

  const h2Style = {
    textAlign: 'center',
    color: '#00BCD4',
    marginBottom: '10px', 
    fontFamily: 'cursive', 
  };

  const greetingStyle = {
    textAlign: 'center',
    marginBottom: '20px', 
    fontFamily: 'cursive', 
  };

  return (
    <div style={containerStyle}>
      <h2 style={h2Style}>Emails List</h2>
      <div style={greetingStyle}>
        <p>Welcome, {currentUser}!</p>
        <p>Below is the list of emails sent by you:</p>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Text</th>
            <th style={thStyle}>To</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email._id}>
              <td style={tdStyle}>{email.name}</td>
              <td style={tdStyle}>{email.id}</td>
              <td style={tdStyle}>{email.category}</td>
              <td style={tdStyle}>{email.text}</td>
              <td style={tdStyle}>{email.to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailList;
