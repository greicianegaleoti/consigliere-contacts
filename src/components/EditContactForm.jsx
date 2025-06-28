// src/components/EditContactForm.jsx
import React, { useState } from 'react';
import api from '../services/api';

function EditContactForm({ contact, onUpdate, onCancel }) {
  const [form, setForm] = useState({
    name: contact.name,
    role: contact.role,
    email: contact.email,
    location: contact.location,
    notes: contact.notes || ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.put(`/contacts/${contact.id}`, form)
      .then(response => {
        onUpdate(response.data);
      })
      .catch(err => {
        console.error('Error updating contact:', err);
      });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="role"
        placeholder="Role or Title"
        value={form.role}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email address"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      ></textarea>
      <div className="form-buttons">
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default EditContactForm;
