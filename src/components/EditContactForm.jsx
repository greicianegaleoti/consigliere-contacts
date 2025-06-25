import React, { useState } from 'react';
import api from '../services/api';

function EditContactForm({ contact, onUpdate, onCancel }) {
  const [form, setForm] = useState({
    name: contact.name,
    role: contact.role,
    location: contact.location,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.put(`/contacts/${contact.id}`, form)
      .then(response => {
        onUpdate(response.data);
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
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button className="btn update" type="submit">Update</button>
        <button className="btn cancel" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default EditContactForm;
