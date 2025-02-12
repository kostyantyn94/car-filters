import { Suspense } from "react";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
import VehicleModels from "../../../components/VehicleModels";
import {fetchModels} from "@/app/utils/api";

type Params = Promise<{ makeId: string, year: string }>

interface PageProps {
  params: Params
}
interface VehicleMake {
  MakeId: number;
}

interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export async function generateStaticParams() {
  const res = await fetch(`${API_BASE}/vehicles/GetMakesForVehicleType/car?format=json`);
  const data = await res.json();
  const makes: VehicleMake[] = data.Results;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

  return makes.flatMap((make: VehicleMake) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString()
    }))
  );
}

export default async function ResultPage({ params  }: PageProps) {
  const { makeId, year } =  await params;

   const models: VehicleModel[] = await fetchModels(makeId, year)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          🚗 Vehicle Models
        </h1>
        <p className="text-lg text-gray-700"><strong>Make:</strong> {makeId}</p>
        <p className="text-lg text-gray-700"><strong>Year:</strong> {year}</p>
        <Suspense fallback={<p className="text-lg text-gray-500 text-center">Loading models...</p>}>
          <VehicleModels models={models} />
        </Suspense>
      </div>
    </div>
  );
}
