"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {fetchMakes} from "@/app/utils/api";


interface VehicleMake {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export default function Home() {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => (2015 + i).toString());

  useEffect(() => {
    async function getMakes() {
      try {
        const makesData = await fetchMakes();
        setMakes(makesData);
      } catch (error) {
        console.error(error);
      }
    }
    getMakes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-8">
      <div className="shadow-lg rounded-lg p-6 w-full max-w-md border bg-white border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center">🚗 Select Vehicle Make & Year</h1>

        <div className="space-y-4">
          <select
            className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 bg-white text-gray-900 focus:ring-blue-500"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">Select a Make</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId.toString()}>
                {make.MakeName}
              </option>
            ))}
          </select>

          <select
            className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 bg-white text-gray-900 focus:ring-blue-500"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select a Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <Link href={selectedMake && selectedYear ? `/result/${selectedMake}/${selectedYear}` : "#"}>
            <button
              className={`w-full p-3 mt-4 font-semibold rounded-lg transition transform hover:scale-105 hover:shadow-lg ${
                selectedMake.length && selectedYear
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              disabled={!selectedMake.length || !selectedYear}
            >
              Next
            </button>
          </Link>

          <Link href="/favorites">
            <button className="w-full p-3 mt-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition transform hover:scale-105">
              ⭐ View Favorites
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}