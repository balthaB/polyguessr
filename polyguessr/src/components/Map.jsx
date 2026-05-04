import { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker, Polyline } from 'react-leaflet'
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

export default function GameMap({onMapClick, mapHeight, expanded, onToggleExpand, guess, currentSpot, showResult}) {
    const [markerPos, setMarkerPos] = useState(null)
    
    function handleClick(latlng) {
        setMarkerPos(latlng)
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
                {markerPos && <Marker position={markerPos} icon={guessIcon} />}

                {showResult && currentSpot && <>
                    <Marker position= {[currentSpot.lat, currentSpot.lng]} icon={resultIcon}/>
                    <Polyline
                        positions={[guess, [currentSpot.lat, currentSpot.lng]]}
                        pathOptions={{ color: '#cc1f12aa', weight: 2, dashArray: '6 6'}}
                    />

                </>}
            </MapContainer>
        </div>
        </>
    )
}