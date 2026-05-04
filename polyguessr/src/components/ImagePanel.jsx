export default function ImagePanel({ spot, onPass, imageHeight, onGuess, guess }) {
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
      <div style={{ 
        height: '100%',  
        fontSize: '1.4rem', 
        fontWeight: 'bold', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        color: '#ffffffaa',
      }}>
        
        <span>{spot.id}</span>
        <button
          disabled={!guess}
          onClick={onGuess}
          style={{
            marginTop: '8px',
            padding: '10px 18px',
            backgroundColor: guess ? '#cc1f12' : '#cc1f1222',
            color: 'white',
            border: '1px solid #ffffff44',
            borderRadius: '20px',
            fontSize: '0.85rem',
            cursor: guess ? 'pointer' : 'not-allowed',
          }}
          onMouseOver={e => { if(guess) e.target.style.backgroundColor = 'transparent' }}
          onMouseOut={e => { if(guess) e.target.style.backgroundColor = '#cc1f12' }}
        >
          Guess
        </button>


      </div>
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
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        height: '100%', 
        gap: '8px', 
        color: 'white' }}>
        
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