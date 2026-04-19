"use client";
import dynamic from "next/dynamic";
import boundaryGeoJson from "@/data/map-polygon.json";

const MapClient = dynamic(() => import("@/components/map-client"), { ssr: false });

export default function PetaPage() {
  return (
    <main className="p-4 md:p-8 space-y-4">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold">
          Peta Sasaran Program Kerja KKN
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Menampilkan titik-titik lokasi pelaksanaan dan sasaran program kerja KKN di wilayah kelurahan.
        </p>
      </div>
      <MapClient boundaryGeoJson={boundaryGeoJson as any} />
    </main>
  );
}