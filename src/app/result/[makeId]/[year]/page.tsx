import CarService from "@/app/services/CarService";
import { getAllYears } from "@/app/utils/Utils";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import React from "react";

interface PageProps {
  params: {
    makeId: string;
    year: string;
  };
}

export async function generateStaticParams() {
  let makes: [] = [];
  CarService.getVehicleMakes().then((r) => (makes = r));
  const years = getAllYears();

  const paths = makes
    .map((make: { id: string }) =>
      years.map((year) => ({
        makeId: make.id,
        year: year,
      }))
    )
    .flat();

  return paths;
}

const Results = React.lazy(() => import('./Results'));

export default async function Result({ params }: PageProps) {
  const { makeId, year } = await params;
  return (
    <div className="max-w-2xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Results:</h1>
      <Results makeId={makeId as string} year={year as string} />    
  </div>
  );
}
