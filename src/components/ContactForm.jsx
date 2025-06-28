// src/components/ContactForm.jsx
import React, { useState } from 'react';
import api from '../services/api';

function ContactForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    role: '',
    email: '',
    location: '',
    notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.role || !form.email || !form.location) {
      alert('Please fill in all required fields.');
      return;
    }

    api.post('/contacts', form)
      .then(response => {
        onAdd(response.data);
        setForm({
          name: '',
          role: '',
          email: '',
          location: '',
          notes: ''
        });
      })
      .catch(error => {
        console.error('Error creating contact:', error);
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
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
