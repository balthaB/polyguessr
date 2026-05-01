import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'

const CAMPUS_CENTER = [46.5197, 6.5665]

// Spots hors campus à exclure
const EXCLUDED = ['#77', '#164']

function extractImageUrl(description) {
  const match = description?.match(/src="([^"]+)"/)
  return match ? match[1] : null
}

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => onMapClick(e.latlng)
  })
  return null
}

export default function App() {
  const [spots, setSpots] = useState([])
  const [currentSpot, setCurrentSpot] = useState(null)

  useEffect(() => {
    fetch('/spots.geojson')
      .then(res => res.json())
      .then(data => {
        const parsed = data.features
          .filter(f => f.properties?.description && !EXCLUDED.includes(f.properties?.name))
          .map(f => ({
            id: f.properties.name,
            lat: f.geometry.coordinates[1],
            lng: f.geometry.coordinates[0],
            imageUrl: extractImageUrl(f.properties.description),
          }))
          .filter(s => s.imageUrl) // garder seulement ceux avec une image

        setSpots(parsed)
        pickRandom(parsed)
      })
  }, [])

  function pickRandom(list) {
    const spot = list[Math.floor(Math.random() * list.length)]
    setCurrentSpot(spot)
  }

  const handleMapClick = (latlng) => {
    console.log('Guess:', latlng)
  }

  if (!currentSpot) return <p>Chargement...</p>

  return (
    <div style={{ 
      height: '40vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#1a1a2e',
      flexShrink: 0,
      padding: '16px',
      gap: '16px',
    }}>
      {currentSpot && (
        <>
          <img
            src={currentSpot.imageUrl}
            alt={currentSpot.id}
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
            alignItems: 'center',
            gap: '12px',
            color: 'white',
          }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
              {currentSpot.id}
            </span>
            <span style={{ fontSize: '0.85rem', opacity: 0.5 }}>
              Où est-ce ?
            </span>
            <button 
              onClick={() => pickRandom(spots)}
              style={{
                marginTop: '8px',
                padding: '10px 18px',
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid #ffffff44',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#ffffff22'}
              onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
            >
              ⏭ Pass
            </button>
          </div>
        </>
      )}
    </div>
    
  )
}