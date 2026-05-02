import { useState, useEffect } from 'react'
import ImagePanel from './components/ImagePanel'
import Map from './components/Map'

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
          .filter(s => s.imageUrl)

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

  const imageHeight = mapExpanded ? '20vh' : '60vh'
  const mapHeight = mapExpanded ? '80vh' : '30vh'

  if (!currentSpot) return <p>Processing...</p>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <ImagePanel
        spot={currentSpot}
        onPass={() => pickRandom(spots)}
        imageHeight={imageHeight}
      />
      <Map
        key={currentSpot.id}
        onMapClick={handleMapClick}
        mapHeight={mapHeight}
        expanded={mapExpanded}
        onToggleExpand={() => setMapExpanded(!mapExpanded)}
      />
    </div>
  )
}