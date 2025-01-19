"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Report, { ReportProps } from "@/components/report/report";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Feed() {
  const [disasters, setDisasters] = useState<ReportProps["reportData"][]>([]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("disasters_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "disasters" },
        (payload) => {
          // @ts-expect-error JUST IGNORE
          const formatDisaster = (disaster) => {
            const { created_at, location, ...rest } = disaster;
            const date = new Date(created_at);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const formattedLocation =
              typeof location === "string" ? JSON.parse(location) : location;
            return {
              ...rest,
              location: formattedLocation,
              created_at: `${formattedDate}, ${formattedTime}`,
            };
          };

          if (payload.eventType === "INSERT") {
            setDisasters((prev) => [...prev, formatDisaster(payload.new)]);
          } else if (payload.eventType === "UPDATE") {
            setDisasters((prev) =>
              prev.map((disaster) =>
                disaster.id === payload.new.id
                  ? formatDisaster(payload.new)
                  : disaster
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

  return (
    <section className="px-3 pt-7 h-full">
      <h1 className="text-black text-center text-3xl font-bold">
        Sheltr Event Feed
      </h1>
      <ScrollArea className="flex-1 overflow-auto">
        <ul className="flex flex-col gap-5 pt-3">
          {disasters
            .sort((a, b) => {
              try {
                const likesA = a.likes ? JSON.parse(a.likes) : [];
                const likesB = b.likes ? JSON.parse(b.likes) : [];
                return likesB.length - likesA.length;
              } catch (error) {
                console.error("Error parsing likes:", error);
                return 0;
              }
            })
            .map((disaster, index) => (
              <li key={index}>
                <Report reportData={disaster}></Report>
              </li>
            ))}
        </ul>
      </ScrollArea>
    </section>
  );
}
