const { useState } = React;
const { createRoot } = ReactDOM;

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const addCustomer = () => {
    if (!name || !email) return;
    setCustomers([...customers, { id: Date.now(), name, email }]);
    setName('');
    setEmail('');
  };

  const startEdit = (customer) => {
    setEditingId(customer.id);
    setEditName(customer.name);
    setEditEmail(customer.email);
  };

  const saveEdit = (id) => {
    setCustomers(
      customers.map((c) => (c.id === id ? { ...c, name: editName, email: editEmail } : c))
    );
    setEditingId(null);
    setEditName('');
    setEditEmail('');
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
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
      <table border="1" style={{ marginTop: '1rem', width: '100%' }}>
        <thead>
          <tr>
            <th>名前</th>
            <th>メール</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>
                {editingId === c.id ? (
                  <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                ) : (
                  c.name
                )}
              </td>
              <td>
                {editingId === c.id ? (
                  <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                ) : (
                  c.email
                )}
              </td>
              <td>
                {editingId === c.id ? (
                  <button onClick={() => saveEdit(c.id)}>保存</button>
                ) : (
                  <>
                    <button onClick={() => startEdit(c)}>編集</button>
                    <button onClick={() => deleteCustomer(c.id)}>削除</button>
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

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<CustomerManagement />);

