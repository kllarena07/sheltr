"use client";

import { Map as MapView, Marker } from "react-map-gl";
import { useState, useEffect } from "react";
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
import { createReportAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import Report from "@/components/report/report";
import { ReportProps } from "@/components/report/report";
import toast, { Toaster } from "react-hot-toast";

export default function Map() {
  const [currentPosition, setCurrentPosition] = useState<{
    longitude: number | undefined;
    latitude: number | undefined;
  }>({
    longitude: undefined,
    latitude: undefined,
  });

  const [markerPosition, setMarkerPosition] = useState<{
    longitude: number | undefined;
    latitude: number | undefined;
  }>({
    longitude: undefined,
    latitude: undefined,
  });
  const [createState, setCreateState] = useState(false);

  const [infoState, setInfoState] = useState<{
    active: boolean;
    disaster: ReportProps["reportData"] | undefined;
  }>({
    active: false,
    disaster: undefined,
  });

  const [disasters, setDisasters] = useState<{ [key: string]: unknown }[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    const supabase = createClient();

    const channel = supabase
      .channel("disasters_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "disasters" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setDisasters((prev) => [...prev, payload.new]);
          } else if (payload.eventType === "UPDATE") {
            setDisasters((prev) =>
              prev.map((disaster) =>
                disaster.id === payload.new.id ? payload.new : disaster
              )
            );
          } else if (payload.eventType === "DELETE") {
            setDisasters((prev) =>
              prev.filter((disaster) => disaster.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    const fetchDisasters = async () => {
      const { data, error } = await supabase.from("disasters").select("*");
      if (data) {
        const formattedData = await Promise.all(
          data.map(async (disaster) => {
            const { created_at, location, ...rest } = disaster;

            const date = new Date(created_at);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const formattedLocation = JSON.parse(location);

            return {
              ...rest,
              location: formattedLocation,
              created_at: `${formattedDate}, ${formattedTime}`,
            };
          })
        );
        setDisasters(formattedData);
      }
      if (error) console.error("Error fetching disasters:", error);
    };
    fetchDisasters();

    return () => {
      supabase.removeChannel(channel);
    };
  });

  if (
    currentPosition.longitude === undefined ||
    currentPosition.latitude === undefined
  ) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative max-w-full h-full overflow-hidden">
      <Toaster />
      <div className="w-full h-full relative">
        <MapView
          onClick={(e) => {
            const { lngLat } = e;
            setCreateState(true);
            setMarkerPosition({
              longitude: lngLat.lng,
              latitude: lngLat.lat,
            });
          }}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: currentPosition.longitude,
            latitude: currentPosition.latitude,
            zoom: 14,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          attributionControl={false}
        >
          <Marker
            longitude={currentPosition.longitude}
            latitude={currentPosition.latitude}
            anchor="bottom"
            offset={[0, 0]}
            color="blue"
          />
          {disasters.map((disaster) => (
            <Marker
              key={String(disaster.id)}
              onClick={(e) => {
                e.originalEvent.stopPropagation(); // Prevent map click event
                setInfoState({
                  active: true,
                  disaster: disaster as ReportProps["reportData"],
                });
              }}
              longitude={(disaster.location as [number, number])[0]}
              latitude={(disaster.location as [number, number])[1]}
              anchor="bottom"
              offset={[0, 0]}
              color={
                disaster.severity === "high"
                  ? "red"
                  : disaster.severity === "medium"
                  ? "yellow"
                  : "lightblue"
              }
            />
          ))}
        </MapView>
        {infoState.active ? (
          <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setInfoState({ ...infoState, active: !infoState.active });
              }
            }}
          >
            <div className="w-5/6">
              {infoState.disaster && <Report reportData={infoState.disaster} />}
            </div>
          </div>
        ) : undefined}
        {createState ? (
          <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setCreateState(!createState);
              }
            }}
          >
            <form
              className="flex flex-col gap-5 bg-white opacity-100 w-5/6 p-5 shadow-2xl"
              onSubmit={(e) => {
                e.preventDefault();
                createReportAction(new FormData(e.currentTarget));
                setCreateState(false);
                toast.success("Report created successfully");
              }}
            >
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
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                name="longitude"
                value={markerPosition.longitude}
                required
              />
              <input
                type="hidden"
                name="latitude"
                value={markerPosition.latitude}
                required
              />
              <Button className="w-full h-[50px] font-bold" type="submit">
                Report disaster
              </Button>
            </form>
          </div>
        ) : undefined}
      </div>
    </section>
  );
}
