export default function ImagePanel({ spot, onPass, imageHeight, onGuess, guess, showResult }) {
  return (
    <div style={{
      height: '100%',
      transition: 'height 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#1a1a2e',
      flexShrink: 0,
      padding: '16px',
      gap: '8px',
    }}>

      {/* TOP: Spot ID */}
      <div style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#ffffffaa',
        flexShrink: 0,
      }}>
        <span>{spot.id}</span>
      </div>

      {/* MIDDLE: Image Container */}
      <div style={{
        flex: 1,
        minHeight: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6px',
      }}>
        <img
          src={spot.imageUrl}
          alt={spot.id}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            border: '2px solid #ffffff22',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        />
      </div>

      {/* BOTTOM: Buttons Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap: '16px',
        flexShrink: 0,
        paddingBottom: '4px',
        height: '50px',
      }}>
        <button
          onClick={onPass}
          style={{
            padding: '10px 24px',
            backgroundColor: '#cc1f12',
            color: 'white',
            border: '1px solid #ffffff44',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
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
            padding: '10px 24px',
            backgroundColor: (guess && !showResult) ? '#cc1f12' : '#cc1f1222',
            color: 'white',
            border: '1px solid #ffffff44',
            borderRadius: '20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: (guess && !showResult) ? 'pointer' : 'not-allowed',
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