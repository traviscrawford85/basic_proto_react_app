import React, { useState } from 'react';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';

const App = () => {
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
  };

  return (
    <div>
      <h1>SQLite React Integration</h1>
      <AddItem onItemAdded={() => window.location.reload()} />
      <ItemList onEdit={handleEdit} />
    </div>
  );
};

export default App;
