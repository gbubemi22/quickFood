import React from "react";

interface MapComponentProps {
  onSelect: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onSelect }) => {
  // Simulate selecting a location
  const handleSelectLocation = () => {
    const lat = 37.7749; // Example latitude (San Francisco)
    const lng = -122.4194; // Example longitude (San Francisco)
    onSelect(lat, lng);
  };

  return (
    <div className="border p-3 rounded-md shadow-md bg-gray-100 text-center">
      <p className="text-gray-600">Click the button to select a location.</p>
      <button
        onClick={handleSelectLocation}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Select Location
      </button>
    </div>
  );
};

export default MapComponent;
