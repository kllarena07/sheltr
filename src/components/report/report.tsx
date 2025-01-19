import { MapPinIcon, OctagonAlertIcon, ThumbsUp } from "lucide-react";

type SeverityType = "high" | "medium" | "low";
type DisasterType =
  | "fire"
  | "flood"
  | "earthquake"
  | "heatwave"
  | "landslide"
  | "tornado";

type ReportProps = {
  reportData: {
    created_at: string;
    description: string;
    id: number;
    likes: number;
    location: Float32Array;
    severity: SeverityType;
    type: DisasterType;
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

export default function Report({ reportData }: ReportProps) {
  const { created_at, description, location, severity, type } = reportData;

  return (
    <section className="flex flex-col gap-2 border p-5">
      <header>
        <div className="flex items-center gap-2">
          <HighHazardWarning />
          <h2 className="font-bold text-2xl">
            {type.charAt(0).toUpperCase() + type.slice(1)} Alert
          </h2>
        </div>
      </header>

      <main>
        <p>{description}</p>
      </main>

      <footer>
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <MapPinIcon className="w-4 h-4" stroke="gray" />
            <small className="text-gray-500">Riverside Country</small>
          </div>
          <small className="text-gray-500">{created_at}</small>
        </div>
        <div className="flex justify-end mt-2.5">
          <ThumbsUp className="w-6 h-6" />
        </div>
      </footer>
    </section>
  );
}
