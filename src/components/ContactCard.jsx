import React from 'react';

function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{contact.name}</h3>
      <p><strong>Role:</strong> {contact.role}</p>
      <p><strong>Location:</strong> {contact.location}</p>

      <div className="card-buttons">
        <button className="btn edit" onClick={onEdit}>Edit</button>
        <button className="btn delete" onClick={() => onDelete(contact.id)}>Delete</button>
      </div>
    </div>
  );
}

export default ContactCard;
