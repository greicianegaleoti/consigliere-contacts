// src/components/ContactCard.jsx
import React from 'react';

function ContactCard({ contact, onDelete, onEdit }) {
  return (
    <div className="contact-card">
      <h3>{contact.name}</h3>
      <p><strong>Role:</strong> {contact.role}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Location:</strong> {contact.location}</p>
      {contact.notes && <p><strong>Notes:</strong> {contact.notes}</p>}
      <div className="actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={() => onDelete(contact.id)}>Delete</button>
      </div>
    </div>
  );
}

export default ContactCard;
