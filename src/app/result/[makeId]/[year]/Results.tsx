'use client';
import CarService from '@/app/services/CarService';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';

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
      .then(r => {
        setModels(r);
      })
      .catch(e => setError('Failed to fetch vehicle data.'))
  }, [props.makeId, props.year]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <Suspense
      fallback={<p className="text-center">Loading vehicle models...</p>}
    >
      <div className="flex justify-center flex-col">
        <ul className="space-y-4">
          <h1 className="text-1xl font-bold mb-4 flex justify-center">
            {models.length ? `${models[0].makeName} ${props?.year}` : ''}
          </h1>

          {models.map((m, index) => (
            <li
              key={index}
              className="p-4 border rounded shadow hover:bg-gray-100 transition"
            >
              <p className="text-lg font-semibold">
                {index + 1 + '. ' + m.modelName}
              </p>
            </li>
          ))}
        </ul>

        <div className="pt-8 flex justify-center">
          <Link
            href="/"
            className="w-24 p-2 pt-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center"
          >
            Back
          </Link>
        </div>
      </div>
    </Suspense>
  );
}
