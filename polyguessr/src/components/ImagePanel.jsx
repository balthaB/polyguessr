export default function ImagePanel({ spot, onPass, imageHeight, onGuess, guess, showResult }) {
  return (
    <div style={{
      height: imageHeight,
      transition: 'height 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#1a1a2e',
      flexShrink: 0,
      padding: 'clamp(8px, 2vw, 16px)',
      gap: 'clamp(8px, 2vw, 16px)',
    }}>

      {/* LEFT: Spot ID */}
      <div style={{
        height: '100%',
        fontSize: 'clamp(1rem, 4vw, 1.4rem)',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        color: '#ffffffaa',
        flexShrink: 0,
      }}>
        <span>{spot.id}</span>
      </div>

      {/* CENTER: Image */}
      <img
        src={spot.imageUrl}
        alt={spot.id}
        style={{
          height: '100%',
          flex: 1,
          minWidth: 0,
          objectFit: 'contain',
          border: '3px solid #ffffff22',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      />

      {/* RIGHT: Buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',
        gap: '8px',
        color: 'white',
        flexShrink: 0,
      }}>
        <button
          onClick={onPass}
          style={{
            marginTop: '8px',
            padding: 'clamp(6px, 2vw, 10px) clamp(10px, 3vw, 18px)',
            backgroundColor: '#cc1f12',
            color: 'white',
            border: '1px solid #ffffff44',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
            whiteSpace: 'nowrap',
          }}
          onMouseOver={e => e.target.style.backgroundColor = 'transparent'}
          onMouseOut={e => e.target.style.backgroundColor = '#cc1f12'}
        >
          ⏭ Next
        </button>

        <button
          disabled={!(guess && !showResult)}
          onClick={onGuess}
          style={{
            marginTop: '8px',
            padding: 'clamp(6px, 2vw, 10px) clamp(10px, 3vw, 18px)',
            backgroundColor: (guess && !showResult) ? '#cc1f12' : '#cc1f1222',
            color: 'white',
            border: '1px solid #ffffff44',
            borderRadius: '20px',
            fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
            cursor: (guess && !showResult) ? 'pointer' : 'not-allowed',
            whiteSpace: 'nowrap',
          }}
          onMouseOver={e => { if ((guess && !showResult)) e.target.style.backgroundColor = 'transparent' }}
          onMouseOut={e => { if ((guess && !showResult)) e.target.style.backgroundColor = '#cc1f12' }}
        >
          Guess
        </button>
      </div>

    </div>
  )
}