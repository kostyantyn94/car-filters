"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ModelDetailsModal from "../components/ModelDetailsModal";

interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<VehicleModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (modelId: number) => {
    const updatedFavorites = favorites.filter((fav) => fav.Model_ID !== modelId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center">⭐ Favorite Models</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favorites.map((model) => (
              <div
                key={model.Model_ID}
                className="p-4 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg cursor-pointer relative"
                onClick={() => setSelectedModel(model)}
              >
                <h3 className="text-lg font-semibold">{model.Model_Name}</h3>
                <p className="text-sm text-gray-600">Model ID: {model.Model_ID}</p>
                <button
                  className="absolute top-2 right-2 p-2 rounded-full text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(model.Model_ID);
                  }}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500 text-center">No favorites added yet.</p>
        )}
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
    </div>
  );
}