import React from 'react';
import ReactDOM from 'react-dom/client';
import TestApp from './TestApp.jsx';
// import { BrowserRouter } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import App from './App.jsx';
import './index.css';

console.log('Main.jsx loaded - using TestApp');

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  console.log('Root element found, rendering test app...');
  
  root.render(<TestApp />);
  
  console.log('TestApp rendered successfully');
} catch (error) {
  console.error('Failed to render test app:', error);
  document.body.innerHTML = `
    <div style="padding: 50px; text-align: center; font-family: Arial;">
      <h1>🚨 Render Error</h1>
      <p>Failed to load the test application</p>
      <pre style="background: #f5f5f5; padding: 20px; text-align: left;">${error.toString()}</pre>
    </div>
  `;
}
