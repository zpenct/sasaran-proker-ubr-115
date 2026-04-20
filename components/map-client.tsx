"use client";
import { useEffect, useRef, useState } from "react";
import {
    MapContainer as RLMapContainer,
    TileLayer,
    Marker,
    useMap,
    GeoJSON as RLGeoJSON,
} from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ── Types ──────────────────────────────────────────────────────────────────
interface LocationPoint {
    name: string;
    lat: number | null;
    long: number | null;
    keterangan: string | null;
}

interface ProgramKerja {
    id: string;
    label: string;
    color: string;
    description: string;
    locations: LocationPoint[];
}

// ── Static Data ────────────────────────────────────────────────────────────
const PROGRAM_KERJA: ProgramKerja[] = [
    {
        id: "nib",
        label: "NIB",
        color: "#f59e0b",
        description: "Lokasi sasaran program kerja pembuatan NIB",
        locations: [
            {
                name: "Tembok Lopie Balso Ikan",
                lat: -4.009945,
                long: 119.629205,
                keterangan: "Bakso ikan"
            },
            {
                name: "Sop Ubi Lormas",
                lat: -4.008930,
                long: 119.633171,
                keterangan: "Sop Ubi"
            },
            {
                name: "Warung Anugrah",
                lat: -4.009435,
                long: 119.630473,
                keterangan: "Nasi Kuning"
            },
            {
                name: "Kue Hamiah",
                lat: -4.008357,
                long: 119.632787,
                keterangan: "Kue Basah (Panada, Jalangkote, Kue Lapis, Dadar)"
            },
            {
                name: "Toko Athar Soreang",
                lat: -4.007945,
                long: 119.633124,
                keterangan: "Perdagangan eceran berbagai macam barang (makanan, minuman, tembakau) - Tradisional, Mi"
            },
            {
                name: "Warung Mama Kembar",
                lat: -4.010602,
                long: 119.628329,
                keterangan: "Nasi Kuning"
            },
            {
                name: "Warung Campuran Lormas",
                lat: -4.008293,
                long: 119.632884,
                keterangan: "Menjual aneka sayur dan sembako"
            },
            {
                name: "Warung Nasi Kuning Mama Rezki",
                lat: -4.008875,
                long: 119.633059,
                keterangan: "Nasi Kuning"
            },
            {
                name: "Kedai Alif",
                lat: -4.008854,
                long: 119.632255,
                keterangan: "Kue Basah (Panada, Jalangkote, Kue Lapis, Dadar, dll)"
            },
            {
                name: "Toko Kue Putri",
                lat: -4.006823,
                long: 119.635465,
                keterangan: null
            }
        ]
    },
    {
        id: "Sertifikasi Halal",
        label: "Sertifikasi Halal",
        color: "#ef4444",
        description: "Titik UMKM yang diterbitkan sertifikasi halalnya",
        locations: [
            {
                name: "Warung Anugerah",
                lat: -4.0094402826333555,
                long: 119.63043351106731,
                keterangan: "Nasi Kuning"
            },
            {
                name: "Nasi Kuning Mama Kembar",
                lat: -4.010612988427792,
                long: 119.62828706389945,
                keterangan: "Nasi Kuning"
            },
            {
                name: "Sop Ubi Lormas",
                lat: -4.008813054600805,
                long: 119.63324053902221,
                keterangan: "Makanan Jadi"
            },
            {
                name: "Cireng",
                lat: -4.00907125207459,
                long: 119.62711359484368,
                keterangan: "Cireng Isi"
            },
            {
                name: "Nasi Kuning Mama Rezky",
                lat: -4.008906589222721,
                long: 119.63311683750037,
                keterangan: "Nasi Kuning"
            },
            {
                name: "Toko Kue Putri",
                lat: -4.006823,
                long: 119.635465,
                keterangan: "Kue Bolu"
            },
            {
                name: "Kedai Alif",
                lat: -4.008846106838238,
                long: 119.6321946242913,
                keterangan: "Kedai Kue"
            },
            {
                name: "Toko Kue Ibu Hamiah",
                lat: -4.008168423256539,
                long: 119.63240865151462,
                keterangan: "Kedai Kue"
            },
            {
                name: "Mystea",
                lat: -4.010292552345216,
                long: 119.62915216600797,
                keterangan: "Minuman"
            }
        ]
    },
    {
        id: "google-business-profile",
        label: "Google Business Profile",
        color: "#22c55e",
        description: "Lokasi sasaran program kerja Google Business Profile",
        locations: [
            {
                name: "Es Cemil Ersa",
                lat: -4.008552,
                long: 119.630673,
                keterangan: "Es Cemil"
            },
            {
                name: "Aneka Cemilan",
                lat: -4.009433,
                long: 119.630501,
                keterangan: "Aneka Cemilan dan Minuman (Mie Level, bakso goreng, roti bakar, banana roll)"
            },
            {
                name: "Warung Anugrah",
                lat: -4.009435,
                long: 119.630473,
                keterangan: "Nasi Kuning"
            },
            {
                name: "Cireng Isi Boxtepisungai",
                lat: -4.009246,
                long: 119.627093,
                keterangan: "Cireng"
            },
            {
                name: "Dipoma Sipulung",
                lat: -4.008648,
                long: 119.631583,
                keterangan: "Gorengan dan Minuman"
            },
            {
                name: "Warung Firda",
                lat: -4.008133,
                long: 119.632435,
                keterangan: "Sayur dan kebutuhan dapur"
            },
            {
                name: "mystea",
                lat: -4.010463,
                long: 119.629167,
                keterangan: "Aneka Minuman"
            },
            {
                name: "Warung Nasi Kuning Mama Rezki",
                lat: -4.008875,
                long: 119.633059,
                keterangan: "Nasi Kuning"
            },
            {
                name: "Kedai Alif",
                lat: -4.008854,
                long: 119.632255,
                keterangan: "Kue Basah (Panada, Jalangkote, Kue Lapis, Dadar, dll)"
            },
            {
                name: "Toko Kue Putri",
                lat: -4.006823,
                long: 119.635465,
                keterangan: "Berbagai jenis kue"
            }
        ]
    },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function getOuterRing(geojson: any): number[][] {
    const feature =
        geojson?.type === "FeatureCollection" ? geojson.features?.[0] : geojson;
    const geom = feature?.type === "Feature" ? feature.geometry : feature;
    if (!geom) throw new Error("GeoJSON geometry tidak ditemukan");
    if (geom.type === "Polygon") return geom.coordinates?.[0];
    if (geom.type === "MultiPolygon") return geom.coordinates?.[0]?.[0];
    throw new Error(`Geometry type tidak didukung: ${geom.type}`);
}

const createDotIcon = (color: string, size: "sm" | "md" = "md") => {
    const dotSize = size === "md" ? 19 : 11;
    const ringSize = size === "md" ? 24 : 20;
    return L.divIcon({
        html: `
      <div style="position:relative;width:${ringSize}px;height:${ringSize}px;">
        <div style="
          position:absolute;top:50%;left:50%;
          transform:translate(-50%,-50%);
          width:${dotSize}px;height:${dotSize}px;
          background:${color};
          border:2.5px solid white;
          border-radius:50%;
          box-shadow:0 1px 4px rgba(0,0,0,0.35);
        "></div>
      </div>`,
        className: "custom-dot-marker",
        iconSize: [ringSize, ringSize],
        iconAnchor: [ringSize / 2, ringSize / 2],
        popupAnchor: [0, -(ringSize / 2)],
    });
};

// ── Sub-components ─────────────────────────────────────────────────────────
function FitBounds({ geojson }: { geojson: any }) {
    const map = useMap();
    const hasFit = useRef(false);
    useEffect(() => {
        if (!geojson || hasFit.current) return;
        const bounds = L.geoJSON(geojson).getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [24, 24] });
            hasFit.current = true;
        }
    }, [geojson, map]);
    return null;
}

const MapContainer = RLMapContainer as any;
const GeoJSON = RLGeoJSON as any;

// ── Main Component ─────────────────────────────────────────────────────────
export default function MapClient({ boundaryGeoJson }: { boundaryGeoJson: any }) {
    const [selectedId, setSelectedId] = useState<string>("all");
    const [hovered, setHovered] = useState<(LocationPoint & { color: string; prokerLabel: string }) | null>(null);
    const center: LatLngTuple = [-4.009, 119.631];

    // Proker yang tampil di peta
    const visibleProkers =
        selectedId === "all"
            ? PROGRAM_KERJA
            : PROGRAM_KERJA.filter((p) => p.id === selectedId);

    // Ringkasan untuk panel bawah
    const selectedProker =
        selectedId === "all" ? null : PROGRAM_KERJA.find((p) => p.id === selectedId);

    // Stats
    const totalValid = visibleProkers.reduce(
        (acc, p) => acc + p.locations.filter((l) => l.lat !== null).length,
        0
    );
    const totalNoCoord = visibleProkers.reduce(
        (acc, p) => acc + p.locations.filter((l) => l.lat === null).length,
        0
    );

    return (
        <div className="flex flex-col gap-3">
            {/* ── Toolbar ── */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                {/* Select */}
                <div className="flex items-center gap-2 flex-1">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        Program Kerja
                    </label>
                    <select
                        value={selectedId}
                        onChange={(e) => {
                            setSelectedId(e.target.value);
                            setHovered(null);
                        }}
                        className="flex-1 sm:max-w-xs rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    >
                        <option value="all">Semua Program Kerja</option>
                        {PROGRAM_KERJA.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stats badges */}
                <div className="flex items-center gap-2 text-xs">
                    <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 font-medium">
                        {totalValid} titik terpetakan
                    </span>
                    {totalNoCoord > 0 && (
                        <span className="bg-orange-50 text-orange-600 rounded-full px-3 py-1 font-medium">
                            {totalNoCoord} belum ada koordinat
                        </span>
                    )}
                </div>
            </div>

            {/* ── Description bar ── */}
            {selectedProker && (
                <div
                    className="rounded-lg px-4 py-2.5 text-sm flex items-center gap-2 border"
                    style={{
                        backgroundColor: selectedProker.color + "15",
                        borderColor: selectedProker.color + "40",
                        color: selectedProker.color,
                    }}
                >
                    <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: selectedProker.color }}
                    />
                    <span className="font-medium">{selectedProker.label}</span>
                    <span className="text-gray-500 mx-1">—</span>
                    <span className="text-gray-600">{selectedProker.description}</span>
                </div>
            )}

            {/* ── Map ── */}
            <div className="relative w-full h-[70vh] rounded-xl overflow-hidden shadow border border-gray-200">
                <MapContainer
                    center={center}
                    zoom={15}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />

                    {boundaryGeoJson &&
                        (() => {
                            const ring = getOuterRing(boundaryGeoJson);
                            return (
                                <>
                                    <GeoJSON
                                        data={{
                                            type: "Feature",
                                            properties: {},
                                            geometry: {
                                                type: "Polygon",
                                                coordinates: [
                                                    [[-180, -90], [-180, 90], [180, 90], [180, -90], [-180, -90]],
                                                    ring,
                                                ],
                                            },
                                        }}
                                        style={() => ({ fillColor: "#000", fillOpacity: 0.4, color: "#000", weight: 0 })}
                                    />
                                    <GeoJSON
                                        data={boundaryGeoJson}
                                        style={() => ({ color: "#22c55e", weight: 2.5, fillOpacity: 0 })}
                                    />
                                    <FitBounds geojson={boundaryGeoJson} />
                                </>
                            );
                        })()}

                    {/* Markers — render semua proker yang visible */}
                    {visibleProkers.map((proker) =>
                        proker.locations
                            .filter((loc) => loc.lat !== null && loc.long !== null)
                            .map((loc) => (
                                <Marker
                                    key={`${proker.id}-${loc.name}`}
                                    position={[loc.lat!, loc.long!] as LatLngTuple}
                                    icon={createDotIcon(proker.color, selectedId === "all" ? "sm" : "md")}
                                    eventHandlers={{
                                        mouseover: () =>
                                            setHovered({ ...loc, color: proker.color, prokerLabel: proker.label }),
                                        mouseout: () => setHovered(null),
                                    }}
                                />
                            ))
                    )}
                </MapContainer>

                {/* Hover card */}
                {hovered && (
                    <div className="absolute top-4 left-4 z-[1000] w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 pointer-events-none">
                        <div className="flex items-center gap-1.5 mb-2">
                            <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: hovered.color }}
                            />
                            <span
                                className="text-xs font-medium px-2 py-0.5 rounded-full"
                                style={{
                                    backgroundColor: hovered.color + "20",
                                    color: hovered.color,
                                }}
                            >
                                {hovered.prokerLabel}
                            </span>
                        </div>
                        <h3 className="font-semibold text-sm text-gray-900 leading-snug mb-1">
                            {hovered.name}
                        </h3>
                        {hovered.keterangan && (
                            <p className="text-xs text-gray-500 leading-relaxed">{hovered.keterangan}</p>
                        )}
                        <p className="text-xs text-gray-300 mt-2 font-mono">
                            {hovered.lat?.toFixed(6)}, {hovered.long?.toFixed(6)}
                        </p>
                    </div>
                )}

                {/* Legend */}
                <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-3.5 min-w-[200px]">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">
                        Legenda
                    </p>
                    <div className="space-y-2">
                        {(selectedId === "all" ? PROGRAM_KERJA : [PROGRAM_KERJA.find((p) => p.id === selectedId)!]).map(
                            (proker) => {
                                const count = proker.locations.filter((l) => l.lat !== null).length;
                                return (
                                    <div key={proker.id} className="flex items-center gap-2">
                                        <span
                                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: proker.color }}
                                        />
                                        <span className="text-xs text-gray-700 flex-1 leading-tight">
                                            {proker.label}
                                        </span>
                                        <span
                                            className="text-xs font-medium px-1.5 py-0.5 rounded"
                                            style={{
                                                backgroundColor: proker.color + "20",
                                                color: proker.color,
                                            }}
                                        >
                                            {count}
                                        </span>
                                    </div>
                                );
                            }
                        )}
                    </div>
                    {totalNoCoord > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
                            <span className="text-xs text-gray-400">{totalNoCoord} tanpa koordinat</span>
                        </div>
                    )}
                </div>

                {/* CSS */}
                <style jsx global>{`
          .custom-dot-marker:hover > div > div {
            transform: translate(-50%, -50%) scale(1.4) !important;
            transition: transform 0.15s ease;
          }
          .leaflet-popup-content-wrapper {
            display: none;
          }
        `}</style>
            </div>

            {/* ── Location List Panel (tampil saat 1 proker dipilih) ── */}
            {selectedProker && (
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-700">
                            Daftar Lokasi — {selectedProker.label}
                        </p>
                        <span className="text-xs text-gray-400">
                            {selectedProker.locations.length} total
                        </span>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {selectedProker.locations.map((loc, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                <div className="mt-0.5 flex-shrink-0">
                                    {loc.lat !== null ? (
                                        <span
                                            className="w-2 h-2 rounded-full block mt-1"
                                            style={{ backgroundColor: selectedProker.color }}
                                        />
                                    ) : (
                                        <span className="w-2 h-2 rounded-full block mt-1 bg-gray-200" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800">{loc.name}</p>
                                    {loc.keterangan && (
                                        <p className="text-xs text-gray-500 mt-0.5 truncate">{loc.keterangan}</p>
                                    )}
                                </div>
                                <div className="flex-shrink-0 text-right">
                                    {loc.lat !== null ? (
                                        <span className="text-xs text-gray-400 font-mono">
                                            {loc.lat.toFixed(4)}, {loc.long?.toFixed(4)}
                                        </span>
                                    ) : (
                                        <span className="text-xs text-orange-400 font-medium">Belum ada koordinat</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}