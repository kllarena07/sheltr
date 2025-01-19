import {
  CircleAlertIcon,
  MapPinIcon,
  OctagonAlertIcon,
  ThumbsUp,
  TriangleAlertIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/client";

type SeverityType = "high" | "medium" | "low";
type DisasterType =
  | "fire"
  | "flood"
  | "earthquake"
  | "heatwave"
  | "landslide"
  | "tornado";

export type ReportProps = {
  reportData: {
    created_at: string;
    description: string;
    id: number;
    location: Float32Array;
    severity: SeverityType;
    type: DisasterType;
    address: string;
    user_id: string;
    likes: string;
  };
};

function HighHazardWarning() {
  return (
    <div className="flex bg-red-500 py-1 px-2 rounded-full gap-1">
      <OctagonAlertIcon stroke="white" />
      <span className="text-white font-bold">High</span>
    </div>
  );
}

function MediumHazardWarning() {
  return (
    <div className="flex bg-yellow-500 py-1 px-2 rounded-full gap-1">
      <TriangleAlertIcon stroke="white" />
      <span className="text-white font-bold">Medium</span>
    </div>
  );
}

function LowHazardWarning() {
  return (
    <div className="flex bg-blue-500 py-1 px-2 rounded-full gap-1">
      <CircleAlertIcon stroke="white" />
      <span className="text-white font-bold">Low</span>
    </div>
  );
}

export default function Report({ reportData }: ReportProps) {
  const {
    created_at,
    description,
    severity,
    type,
    address,
    user_id,
    id,
    likes,
  } = reportData;

  const split_created = created_at.split(",");
  const date = split_created[0];
  const time = split_created[1];
  const split_address = address.split(",");
  const street = split_address[0];
  const city = split_address[1];

  const handleLike = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("disasters")
      .select("likes")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching likes:", error);
      return;
    }

    if (data) {
      let likesArray = [];
      try {
        likesArray = JSON.parse(data.likes || "[]");
      } catch (e) {
        console.error("Error parsing likes:", e);
      }
      if (!likesArray.includes(user_id)) {
        likesArray.push(user_id.toString());
      } else {
        likesArray = likesArray.filter(
          (like: string) => like !== user_id.toString()
        );
      }

      const { error: updateError } = await supabase
        .from("disasters")
        .update({ likes: JSON.stringify(likesArray) })
        .eq("id", id);

      if (updateError) {
        console.error("Error updating likes:", updateError);
      } else {
        console.log("Likes updated successfully");
      }
    }
  };

  return (
    <section className="flex flex-col gap-2 border p-5 bg-white">
      <header className="flex justify-between">
        <div className="flex items-center gap-2">
          {severity === "high" && <HighHazardWarning />}
          {severity === "medium" && <MediumHazardWarning />}
          {severity === "low" && <LowHazardWarning />}
          <h2 className="font-bold text-2xl">
            {type.charAt(0).toUpperCase() + type.slice(1)} Alert
          </h2>
        </div>
        <div className="flex flex-col">
          <small>{date}</small>
          <small>{time}</small>
        </div>
      </header>

      <main>
        <p>{description}</p>
      </main>

      <footer>
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <MapPinIcon className="w-4 h-4" stroke="gray" />
            <div className="flex flex-col">
              <small className="text-gray-500">{street}</small>
              <small className="text-gray-500">{city}</small>
            </div>
          </div>
          <Button onClick={handleLike}>
            {likes.includes(user_id) ? (
              <ThumbsUp className="w-6 h-6" fill="white" />
            ) : (
              <ThumbsUp className="w-6 h-6" stroke="white" />
            )}
          </Button>
        </div>
      </footer>
    </section>
  );
}
