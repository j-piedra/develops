"use client";
import CarService from "@/app/services/CarService";
import { useEffect, useState } from "react";

interface ResultsProps {
  makeId: string;
  year: string;
}

export interface Models {
  makeId: number | string;
  makeName: string;
  modelId: number | string;
  modelName: string;
}

export default function Results(props: ResultsProps) {
  const [models, setModels] = useState<Models[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    CarService.getVehicleData(props.makeId, props.year)
      .then((r) => setModels(r))
      .catch((e) => setError("Failed to fetch vehicle data."));
  }, [props.makeId, props.year]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div>
      <ul className="space-y-4">
        <h1 className="text-1xl font-bold mb-4">{ models.length ? `${ models[0].makeName} ${props?.year}` : ""}</h1>

        {models.map((m, index) => (
          <li
            key={index}
            className="p-4 border rounded shadow hover:bg-gray-100 transition"
          >
            <p className="text-lg font-semibold">
              {index + 1 + ". " + m.modelName}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
