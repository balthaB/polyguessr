# Polyguessr 📍

A GeoGuessr-style game for the EPFL campus! A photo of a campus location is shown — your job is to place a pin on the map as close as possible to where it was taken.
Big thanks to the instagram account @polyguessr_ for the game concept and the amazing handtaken images.

<img width="1719" height="1092" alt="image" src="https://github.com/user-attachments/assets/d4840348-b7f2-4c90-b185-2f6f286fb95b" />

---

## How to play

1. A random photo from the EPFL campus is displayed
2. Click on the map to place your guess
3. Hit **Guess** to see how close you were
4. A line is drawn between your guess and the real location, along with your distance and score
5. Click **Next** to move on to a new photo

---

## Tech stack

- **React** + **Vite**
- **Leaflet** + **react-leaflet** for the interactive map
- **OpenStreetMap France** tiles for detailed campus building names
- **GeoJSON** data exported from [UMap](https://umap.openstreetmap.fr/en/map/polyguessr_1375768) for spot locations
- Photos hosted on **GitHub** and referenced via raw URLs

---

## Getting started

### Prerequisites

- Node.js >= 20

### Install and run

```bash
git clone https://github.com/balthaB/polyguessr
cd polyguessr
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

Or simply play at [https://balthab.github.io/polyguessr/](https://balthab.github.io/polyguessr/)

---

## Data

Spot locations and photos are managed via a [UMap map](https://umap.openstreetmap.fr/en/map/polyguessr_1375768) and an Instagram account [@polyguessr_](https://instagram.com/polyguessr_).

The `spots.geojson` file in `public/` is exported from UMap and contains:
- Coordinates of each location
- A description with the winning comment and a link to the photo on GitHub

---

## Scoring

| Distance | Score |
|---|---|
| 0m | 100 pts |
| 5m | 100 pts |
| 50m | 55 pts |
| 100m | 5 pts |
| ≥ 105m | 0 pts |

---

## Credits

Photos and winning comments from [@polyguessr_](https://instagram.com/polyguessr_) on Instagram.  
Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
