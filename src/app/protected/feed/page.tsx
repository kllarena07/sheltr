"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
// import Report from "@/components/report/report";

export default function Feed() {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
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
          console.log("Change received!", disasters);
        }
      )
      .subscribe();

    const fetchDisasters = async () => {
      const { data, error } = await supabase.from("disasters").select("*");
      if (data) {
        setDisasters(data);
        console.log(data);
      }
      if (error) console.error("Error fetching disasters:", error);
    };
    fetchDisasters();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="px-2 py-7">
      <h1 className="text-black text-center text-3xl font-bold">
        Sheltr Event Feed
      </h1>
      <ul>
        {disasters.map((disaster, index) => (
          <li key={index}>{disaster.type}</li>
        ))}
      </ul>
    </section>
  );
}
