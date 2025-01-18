"use client";

import { Map as MapView } from "react-map-gl";

export default function Map() {
  return (
    <div className="max-w-full h-full overflow-hidden">
      <MapView
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
      />
    </div>
  );
}
