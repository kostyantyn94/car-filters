"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ModelDetailsModal from "./ModelDetailsModal";

interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export default function VehicleModels({ models }: { models: VehicleModel[] }) {
  const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "id">("name");
  const [favorites, setFavorites] = useState<VehicleModel[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (model: VehicleModel) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.Model_ID === model.Model_ID)) {
      updatedFavorites = favorites.filter((fav) => fav.Model_ID !== model.Model_ID);
    } else {
      updatedFavorites = [...favorites, model];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const filteredModels = models
    .filter((model) => model.Model_Name.toLowerCase().includes(filter.toLowerCase()))
    .filter((model, index, self) => index === self.findIndex((m) => m.Model_ID === model.Model_ID)); // Убираем дубликаты

  const sortedModels = [...filteredModels].sort((a, b) => {
    if (sortBy === "name") return a.Model_Name.localeCompare(b.Model_Name);
    return a.Model_ID - b.Model_ID;
  });

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search models..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-400 rounded-lg w-full sm:w-auto"
        />
        <button
          onClick={() => setSortBy("name")}
          className={`p-2 rounded-lg ${sortBy === "name" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Sort A-Z
        </button>
        <button
          onClick={() => setSortBy("id")}
          className={`p-2 rounded-lg ${sortBy === "id" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Sort by ID
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sortedModels.map((model, index) => (
          <div
            key={`${model.Model_ID}-${index}`}
            className="p-4 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg cursor-pointer relative"
            onClick={() => setSelectedModel(model)}
          >
            <h3 className="text-lg font-semibold">{model.Model_Name}</h3>
            <p className="text-sm text-gray-600">Model ID: {model.Model_ID}</p>
            <button
              className={`absolute top-2 right-2 p-2 rounded-full ${favorites.some((fav) => fav.Model_ID === model.Model_ID) ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(model);
              }}
            >
              {favorites.some((fav) => fav.Model_ID === model.Model_ID) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>

      {selectedModel && (
        <ModelDetailsModal model={selectedModel} onClose={() => setSelectedModel(null)} />
      )}

      <div className="mt-6 text-center">
        <Link href="/">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
