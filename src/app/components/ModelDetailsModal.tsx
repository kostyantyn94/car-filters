"use client";
import { useEffect } from "react";

interface ModelDetailsModalProps {
  model: {
    Make_Name: string;
    Model_Name: string;
    Model_ID: number;
  } | null;
  onClose: () => void;
}

export default function ModelDetailsModal({ model, onClose }: ModelDetailsModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!model) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">{model.Model_Name}</h2>
        <p className="text-gray-700">
          <strong>Manufacturer:</strong> {model.Make_Name}
        </p>
        <p className="text-gray-700">
          <strong>Model ID:</strong> {model.Model_ID}
        </p>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
