import React, { useState, useEffect } from 'react';
import api from '../services/api';

function EditContactForm({ contact, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    location: ''
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        role: contact.role || '',
        email: contact.email || '',
        location: contact.location || ''
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.email) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await api.put(`/contacts/${contact.id}`, formData);
      onUpdate && onUpdate(response.data);
    } catch (error) {
      console.error('Erro ao atualizar contato:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Edit Contact</h2>
      <input
        type="text"
        name="name"
        placeholder="Name*"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role*"
        value={formData.role}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email*"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel} style={{ backgroundColor: '#999' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditContactForm;
