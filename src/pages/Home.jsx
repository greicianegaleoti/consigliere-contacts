// src/pages/Home.jsx
import React, { useEffect, useState, useMemo } from 'react';
import ContactForm from '../components/ContactForm';
import ContactCard from '../components/ContactCard';
import EditContactForm from '../components/EditContactForm';
import Loader from '../components/Loader';
import api from '../services/api';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    setIsLoading(true);
    api.get('/contacts')
      .then(response => {
        setTimeout(() => {
          setContacts(response.data);
          setIsLoading(false);
        }, 3000);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
        setIsLoading(false);
      });
  }, []);

  const addContact = (newContact) => {
    setContacts(prev => [...prev, newContact]);
  };

  const updateContact = (updated) => {
    api.put(`/contacts/${updated.id}`, updated)
      .then(response => {
        setContacts(prev =>
          prev.map(c => (c.id === updated.id ? response.data : c))
        );
        setEditingContact(null);
      });
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const filteredContacts = useMemo(() => {
    const filtered = contacts.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    setNotFound(!isLoading && search.length > 0 && filtered.length === 0);
    return filtered;
  }, [contacts, search, isLoading]);

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredContacts.slice(start, start + itemsPerPage);
  }, [filteredContacts, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Consigliere Contacts</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          padding: '0.5rem',
          marginBottom: '1rem',
          width: '100%',
          maxWidth: '400px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />

      {!editingContact ? (
        <ContactForm onAdd={addContact} />
      ) : (
        <EditContactForm
          contact={editingContact}
          onUpdate={updateContact}
          onCancel={() => setEditingContact(null)}
        />
      )}

      {isLoading ? (
        <Loader />
      ) : notFound ? (
        <p className="empty-message">Contact not found.</p>
      ) : paginatedContacts.length === 0 ? (
        <p className="empty-message">No contacts found.</p>
      ) : (
        <div className="contact-list">
          {paginatedContacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={deleteContact}
              onEdit={() => setEditingContact(contact)}
            />
          ))}

          <div className="pagination" style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            <span style={{ margin: '0 1rem', color: '#fff', lineHeight: '2rem' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
