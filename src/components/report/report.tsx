import {
  CircleAlertIcon,
  MapPinIcon,
  OctagonAlertIcon,
  ThumbsUp,
  TriangleAlertIcon,
} from "lucide-react";

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
    likes: number;
    location: Float32Array;
    severity: SeverityType;
    type: DisasterType;
    address: string;
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
  const { created_at, description, severity, type, address } = reportData;

  const split_created = created_at.split(",");
  const date = split_created[0];
  const time = split_created[1];
  const split_address = address.split(",");
  const street = split_address[0];
  const city = split_address[1];

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
          <ThumbsUp className="w-6 h-6" />
        </div>
      </footer>
    </section>
  );
}
