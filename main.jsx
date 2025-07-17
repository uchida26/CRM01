import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Simple Customer Management Component
function CustomerManagement() {
  const [customers, setCustomers] = useState([]); // {id, name, email}
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const addCustomer = () => {
    if (!name || !email) return;
    setCustomers([
      ...customers,
      { id: Date.now(), name, email }
    ]);
    setName('');
    setEmail('');
  };

  const startEdit = (id, currentName, currentEmail) => {
    setEditingId(id);
    setEditName(currentName);
    setEditEmail(currentEmail);
  };

  const saveEdit = (id) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, name: editName, email: editEmail } : c));
    setEditingId(null);
    setEditName('');
    setEditEmail('');
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>顧客管理</h1>
      <div>
        <input
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="メール"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addCustomer}>顧客追加</button>
      </div>
      <table border="1" style={{ marginTop: '1rem', width: '100%'}}>
        <thead>
          <tr>
            <th>名前</th>
            <th>メール</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>
                {editingId === customer.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  customer.name
                )}
              </td>
              <td>
                {editingId === customer.id ? (
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  customer.email
                )}
              </td>
              <td>
                {editingId === customer.id ? (
                  <button onClick={() => saveEdit(customer.id)}>保存</button>
                ) : (
                  <>
                    <button onClick={() => startEdit(customer.id, customer.name, customer.email)}>編集</button>
                    <button onClick={() => deleteCustomer(customer.id)}>削除</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<CustomerManagement />);
