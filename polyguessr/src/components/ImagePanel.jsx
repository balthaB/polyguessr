export default function ImagePanel({ spot, onPass, imageHeight}) {
    return (
        <div style={{ 
      height: imageHeight,
      transition: 'height 0.3s ease',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#1a1a2e',
      flexShrink: 0,
      padding: '16px',
      gap: '16px',
    }}>
      <img
        src={spot.imageUrl}
        alt={spot.id}
        style={{ 
          height: '100%', 
          maxWidth: '70%',
          objectFit: 'contain',
          border: '3px solid #ffffff22',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: 'white' }}>
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{spot.id}</span>
        <span style={{ fontSize: '0.85rem', opacity: 0.5 }}>Où est-ce ?</span>
        <button 
          onClick={onPass}
          style={{
            marginTop: '8px',
            padding: '10px 18px',
            backgroundColor: '#cc1f12',
            color: 'white',
            border: '1px solid #ffffff44',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
          onMouseOver={e => e.target.style.backgroundColor = 'transparent'}
          onMouseOut={e => e.target.style.backgroundColor = '#cc1f12'}
        >
          ⏭ Pass
        </button>
      </div>
    </div>
    )
}