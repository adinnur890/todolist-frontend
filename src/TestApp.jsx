import { useState } from 'react';

function TestApp() {
  const [message, setMessage] = useState('');

  const testLogin = () => {
    localStorage.setItem('token', 'test-token-123');
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      name: 'Test User',
      email: 'test@test.com',
      role: 'user'
    }));
    
    setMessage('Token saved! Check localStorage in DevTools');
    
    setTimeout(() => {
      window.location.href = '/todo-list';
    }, 2000);
  };

  const checkToken = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setMessage(`Token: ${token ? 'EXISTS' : 'NOT FOUND'}, User: ${user ? 'EXISTS' : 'NOT FOUND'}`);
  };

  const clearStorage = () => {
    localStorage.clear();
    setMessage('Storage cleared');
  };

  return (
    <div style={{ padding: '50px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>LOGIN TEST</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testLogin} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          TEST LOGIN
        </button>
        
        <button onClick={checkToken} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
          CHECK TOKEN
        </button>
        
        <button onClick={clearStorage} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>
          CLEAR STORAGE
        </button>
      </div>
      
      {message && (
        <div style={{ padding: '10px', backgroundColor: '#333', border: '1px solid #666', marginTop: '20px' }}>
          {message}
        </div>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <h3>Current URL: {window.location.href}</h3>
        <h3>LocalStorage Token: {localStorage.getItem('token') || 'NONE'}</h3>
      </div>
    </div>
  );
}

export default TestApp;