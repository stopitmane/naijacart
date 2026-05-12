// Simple test component to verify React is working
export default function TestApp() {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #008751, #006B3C)',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1>🎉 NaijaCart is Working!</h1>
      <p>React app loaded successfully</p>
      <p>Time: {new Date().toLocaleString()}</p>
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => alert('Button works!')}
          style={{
            background: '#FCD34D',
            color: '#1F2937',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
}