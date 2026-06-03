import { useState, useEffect } from 'react'
import ImagePanel from './components/ImagePanel'
import Map from './components/Map'
import L from 'leaflet'
import logo from './assets/logo_polyguessr_v1.png'

const CAMPUS_CENTER = [46.5197, 6.5665]
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
  const [mapExpanded, setMapExpanded] = useState(false)
  const [guess, setGuess] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [distance, setDistance] = useState(null)
  const [score, setScore] = useState(null)

  useEffect(() => {
    fetch(' spots.geojson')
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
          .filter(s => s.imageUrl)

        setSpots(parsed)
        pickRandom(parsed)
      })
  }, [])

  function pickRandom(list) {
    const spot = list[Math.floor(Math.random() * list.length)]
    setCurrentSpot(spot)
    setGuess(null)
    setShowResult(false)
    setScore(null)
    setMapExpanded(false)
  }

  const handleMapClick = (latlng) => {
    setGuess([latlng.lat, latlng.lng])
  }

  function calculateDistance() {
    return L.latLng(guess).distanceTo([currentSpot.lat, currentSpot.lng])
  }

  function calculateScore(distance) {
    return Math.max(0, Math.min(100, Math.floor(105 - distance)))
  }

  function handleGuess() {
    const distance = calculateDistance()
    setDistance(Math.round(distance))
    setScore(calculateScore(distance))
    setShowResult(true)
  }

  const imageHeight = mapExpanded ? '30dvh' : '50dvh'
  const mapHeight = mapExpanded ? '70dvh' : '50dvh'

  if (!currentSpot) return <p>Processing...</p>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden' }}>
      <img
        src={logo}
        alt="logo"
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          height: 'clamp(40px, 7vw, 150px)',
          objectFit: 'contain',
          zIndex: 1000,
        }}
      />
      <ImagePanel
        spot={currentSpot}
        onPass={() => pickRandom(spots)}
        imageHeight={imageHeight}
        onGuess={() => handleGuess()}
        guess={guess}
        showResult={showResult}
      />
      <Map
        onMapClick={handleMapClick}
        mapHeight={mapHeight}
        expanded={mapExpanded}
        onToggleExpand={() => setMapExpanded(!mapExpanded)}
        guess={guess}
        currentSpot={currentSpot}
        showResult={showResult}
        distance={distance}
        score={score}
      />
    </div>
  )
}