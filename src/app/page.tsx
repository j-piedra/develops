'use client';
import { useEffect, useState } from 'react';
import CarService from './services/CarService';
import Link from 'next/link';
import { getAllYears } from './utils/Utils';

export default function Home() {
  const [vehicleMakes, setVehicleMakes] = useState<[]>([]);
  const [makeId, setMakeId] = useState<number>();
  const [year, setYear] = useState<string>('');

  const years = getAllYears();

  useEffect(() => {
    CarService.getVehicleMakes().then(r => {
      const sorted = r.sort((a, b) => a.name.localeCompare(b.name));
      setVehicleMakes(sorted);
    });
  }, []);

  const handleChangeVehicleMake = e => {
    setMakeId(e.target.value);
  };
  const handleChangeYear = e => {
    setYear(e.target.value);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <>
          <p>Vehicle Make: </p>
          <select value={makeId} onChange={handleChangeVehicleMake}>
            <option value="">Select an option</option>

            {vehicleMakes?.map((vm: unknown) => {
              return (
                <option key={vm.id} value={vm.id}>
                  {vm.name}
                </option>
              );
            })}
          </select>

          <p>Year: </p>

          <select value={year} onChange={handleChangeYear}>
            <option value="">Select an option</option>

            {years.map((y, i) => {
              return (
                <option key={i} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
          <div className="flex justify-center">
            <Link
              className={
                'w-24 p-2 pt-2 text-white rounded hover:bg-blue-600 flex justify-center bg-blue-500'
              }
              style={
                year && makeId
                  ? {}
                  : {
                      cursor: 'not-allowed',
                      color: 'gray',
                      pointerEvents: 'none',
                      background: '#D3D3D3',
                    }
              }
              href={`/result/${makeId}/${year}`}
            >
              Next
            </Link>
          </div>
        </>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
