import { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker, Polyline, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'

function ClickHandler({ onMapClick }) {
  useMapEvents({ click: (e) => onMapClick(e.latlng) })
  return null
}

const CAMPUS_CENTER = [46.5197, 6.5665]

const guessIcon = divIcon({
    className: '',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z"
            fill="#cc1f12" stroke="white" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>`,
    iconAnchor: [12, 36],
    iconSize: [24, 36],
})

const resultIcon = divIcon({
    className: '',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z"
            fill="#29881b" stroke="white" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>`,
    iconAnchor: [12, 36],
    iconSize: [24, 36],
})

export default function GameMap({onMapClick, mapHeight, expanded, onToggleExpand, guess, currentSpot, showResult, distance, score}) {
    const boxSize = distance < 50 ? '1.2rem' : distance < 200 ? '0.95rem' : '0.75rem'
    const boxPadding = distance < 50 ? '2px 4px' : distance < 200 ? '8px 12px' : '6px 10px'

    function handleClick(latlng) {
        onMapClick(latlng)
    }

    return (
        <>
        {/* Expand button */}
        <div style={{
            backgroundColor: '#12122a',
            display: 'flex',
            justifyContent: 'center',
            padding: '6px',
            flexShrink: 0,
        }}>
            <button
            onClick={onToggleExpand}
            style={{
                backgroundColor: '#ffffff15',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '4px 16px',
                cursor: 'pointer',
                fontSize: '0.8rem',
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#ffffff30'}
            onMouseLeave={e => e.target.style.backgroundColor = '#ffffff15'}
            >
            {expanded ? '▼ Reduce map' : '▲ Extend map'}
            </button>
        </div>

        {/* Map */}
        <div style={{ height: mapHeight, transition: 'height 0.3s ease' }}>
            <MapContainer center={CAMPUS_CENTER} zoom={18} maxZoom={24} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    maxZoom={24}
                />
                <ClickHandler onMapClick={handleClick} />
                {guess && <Marker position={guess} icon={guessIcon} />}
                {showResult && currentSpot && distance !== null&& (
                    <>
                        <Marker position={[currentSpot.lat, currentSpot.lng]} />
                        <Polyline
                        positions={[guess, [currentSpot.lat, currentSpot.lng]]}
                        pathOptions={{ color: '#cc1f12', weight: 2, dashArray: '6 6' }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: '#1a1a2e',
                            color: 'white',
                            padding: boxPadding,
                            borderRadius: '8px',
                            border: '1px solid #ffffff33',
                            whiteSpace: 'nowrap',
                            fontSize: boxSize,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                            zIndex: 1000,  // ← above the map
                            pointerEvents: 'none',  // ← clicks go through to the map
                            }}>
                            📍 {distance}m &nbsp;|&nbsp; ⭐ {score} pts
                        </div>
                    </>
                    )}

            </MapContainer>
        </div>
        </>
    )
}