"use client";

import { Map as MapView, Marker } from "react-map-gl";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
  const [createState, setCreateState] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({
    longitude: -122.4,
    latitude: 37.8,
  });

  return (
    <section className="relative max-w-full h-full overflow-hidden">
      <div className="w-full h-full relative">
        <MapView
          onClick={(e) => {
            const { lngLat } = e;
            setCreateState(!createState);
            setMarkerPosition({ longitude: lngLat.lng, latitude: lngLat.lat });
          }}
          onZoom={(e) => {
            setMarkerPosition({
              longitude: e.viewState.zoom,
              latitude: e.viewState.zoom,
            });
          }}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          attributionControl={false}
        >
          <Marker
            longitude={markerPosition.longitude}
            latitude={markerPosition.latitude}
            anchor="bottom"
            offset={[0, 0]}
          />
        </MapView>
        {createState ? (
          <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setCreateState(!createState);
              }
            }}
          >
            <form className="flex flex-col gap-5 bg-white opacity-100 w-5/6 p-5">
              <h1 className="font-bold text-2xl">Report a Disaster</h1>
              <Textarea
                placeholder="What's happening?"
                name="description"
                required
              />
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select disaster type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="heatwave">Heatwave</SelectItem>
                  <SelectItem value="landslide">Landslide</SelectItem>
                  <SelectItem value="tornado">Tornado</SelectItem>
                </SelectContent>
              </Select>
              <Select name="severity" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select disaster severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire">High</SelectItem>
                  <SelectItem value="flood">Medium</SelectItem>
                  <SelectItem value="earthquake">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">Report disaster</Button>
            </form>
          </div>
        ) : undefined}
      </div>
    </section>
  );
}
