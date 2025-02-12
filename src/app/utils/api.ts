const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

interface VehicleMake {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export async function fetchMakes(): Promise<VehicleMake[]> {
  const res = await fetch(`${API_BASE}/vehicles/GetMakesForVehicleType/car?format=json`);

  if (!res.ok) {
    throw new Error("Failed to fetch vehicle makes");
  }

  const data: { Results: VehicleMake[] } = await res.json();
  return data.Results;
}

export async function fetchModels(makeId: string, year: string): Promise<VehicleModel[]> {
  const res = await fetch(
    `${API_BASE}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch vehicle models");
  }

  const data: { Results: VehicleModel[] } = await res.json();
  return data.Results || [];
}
