import { useState, useEffect } from 'react'
import ImagePanel from './components/ImagePanel'
import Map from './components/Map'
import L from 'leaflet'
import logo from './assets/logo_polyguessr_v1.png'

const CAMPUS_CENTER = [46.5197, 6.5665]
const EXCLUDED = ['#77', '#164', '#151'] // 77 and 164 april fools and 151 no image for now

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => onMapClick(e.latlng)
  })
  return null
}

export default function App() {
  const [spots, setSpots] = useState([])
  const [currentSpot, setCurrentSpot] = useState(null)
  const [guess, setGuess] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [distance, setDistance] = useState(null)
  const [score, setScore] = useState(null)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 800)

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
            // Remove the '#' from the name to get the correct image filename
            imageUrl: `./img/${f.properties.name.replace('#', '')}.webp`
          }))
          .filter(s => s.imageUrl)

        setSpots(parsed)
        pickRandom(parsed)
      })
  }, [])

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 800)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  function pickRandom(list) {
    const spot = list[Math.floor(Math.random() * list.length)]
    setCurrentSpot(spot)
    setGuess(null)
    setShowResult(false)
    setScore(null)
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

  const containerDirection = isDesktop ? 'row' : 'column'
  const panelWidth = isDesktop ? '50vw' : '100%'
  const imageHeight = isDesktop ? '100%' : '50%'
  const mapHeight = isDesktop ? '100%' : '50%'

  if (!currentSpot) return <p>Processing...</p>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden', backgroundColor: '#1a1a2e' }}>

      {/* HEADER: */}
      <div style={{
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        borderBottom: '1px solid #ffffff22'
      }}>
        <img
          src={logo}
          alt="Polyguessr Logo"
          style={{
            height: 'clamp(40px, 7vh, 60px)',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* GAME AREA */}
      <div style={{
        display: 'flex',
        flexDirection: containerDirection,
        flex: 1,
        minHeight: 0
      }}>

        {/* Left Side (or Top on Mobile) */}
        <div style={{ width: panelWidth, height: imageHeight, transition: 'all 0.3s ease' }}>
          <ImagePanel
            spot={currentSpot}
            onPass={() => pickRandom(spots)}
            imageHeight={imageHeight}
            onGuess={() => handleGuess()}
            guess={guess}
            showResult={showResult}
          />
        </div>

        {/* Right Side (or Bottom on Mobile) */}
        <div style={{ width: panelWidth, height: mapHeight, transition: 'all 0.3s ease' }}>
          <Map
            onMapClick={handleMapClick}
            guess={guess}
            currentSpot={currentSpot}
            showResult={showResult}
            distance={distance}
            score={score}
          />
        </div>

      </div>
    </div>
  )
}