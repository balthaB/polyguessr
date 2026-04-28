import { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import './App.css'

const MAP_CENTER = [46.520241, 6.565874]
const MAP_ZOOM = 17

function ClickHandler ({ onMapClick}) {
  useMapEvents({
    click: (e) => onMapClick(e.latlng)
  })
  return null
}

export default function App() {
  const handleMapClick = (latlng) => {
    console.log('Guess: ', latlng)
  }
  
  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap'
      />
      <ClickHandler onMapClick={handleMapClick} />
    </MapContainer>
  )
}