import { useMemo, useState } from "react";
import { site } from "../data/site";

type SpaceType = "warehouse" | "yard" | "shed";

interface LayoutResult {
  title: string;
  dimensions: string;
  truckBays: number;
  circulation: string;
  expansion: string;
  features: string[];
}

const SPACE_TYPES: { id: SpaceType; label: string; description: string }[] = [
  {
    id: "warehouse",
    label: "Warehouse",
    description: "Distribution, inventory, 3PL",
  },
  {
    id: "yard",
    label: "Yard",
    description: "Container storage, fleet parking",
  },
  {
    id: "shed",
    label: "Shed",
    description: "Manufacturing, assembly, packaging",
  },
];

function calculateLayout(sqft: number, type: SpaceType): LayoutResult {
  const totalSqft = site.landAreaAcres * 43560;
  const remainingSqft = Math.max(0, totalSqft - sqft);
  const remainingAcres = (remainingSqft / 43560).toFixed(2);
  const expansionNote =
    remainingSqft > 0
      ? `Remaining ${remainingAcres} acres on the ${site.landAreaAcres}-acre site (${remainingSqft.toLocaleString()} sq ft) available for Phase 2 expansion`
      : `Full ${site.landAreaAcres}-acre site allocated — build-to-suit configuration across entire parcel`;

  if (type === "warehouse") {
    const width = Math.round(Math.sqrt(sqft * 1.6));
    const depth = Math.round(sqft / width);
    const bays = Math.max(2, Math.floor(sqft / 10000));
    return {
      title: "Warehouse Layout",
      dimensions: `${width}' × ${depth}' (${sqft.toLocaleString()} sq ft)`,
      truckBays: bays,
      circulation: `${bays} dock-high loading bays with 40' truck apron and 60' circulation lane`,
      expansion: expansionNote,
      features: [
        "Cross-dock configuration available",
        "Office mezzanine: ~10% of footprint",
        "Clear height: 32–40 ft (build-to-suit)",
        "NH-facing truck entry",
      ],
    };
  }

  if (type === "yard") {
    const containers = Math.floor(sqft / 400);
    const truckSlots = Math.floor(sqft / 1200);
    return {
      title: "Logistics Yard Layout",
      dimensions: `${Math.round(Math.sqrt(sqft * 2))}' × ${Math.round(sqft / Math.sqrt(sqft * 2))}' open yard`,
      truckBays: truckSlots,
      circulation: `Dual 30' internal roads with ${truckSlots} heavy vehicle parking slots`,
      expansion: expansionNote,
      features: [
        `~${containers} TEU container stacking capacity`,
        "Fenced perimeter with gated entry",
        "Direct highway frontage access",
        "Storm water drainage provision",
      ],
    };
  }

  const width = Math.round(Math.sqrt(sqft * 1.3));
  const depth = Math.round(sqft / width);
  return {
    title: "Industrial Shed Layout",
    dimensions: `${width}' × ${depth}' (${sqft.toLocaleString()} sq ft)`,
    truckBays: Math.max(1, Math.floor(sqft / 15000)),
    circulation: "Dedicated loading zone with forklift circulation and truck turning radius",
    expansion: expansionNote,
    features: [
      "Suitable for electronics assembly & packaging",
      "Power load: configurable to requirement",
      "Mezzanine office option",
      "Vendor storage & component staging",
    ],
  };
}

function LayoutDiagram({ type, sqft }: { type: SpaceType; sqft: number }) {
  const scale = Math.min(1, 280 / Math.sqrt(sqft));

  const w = Math.round(Math.sqrt(sqft * (type === "yard" ? 2 : 1.5)) * scale);
  const h = Math.round((sqft / Math.sqrt(sqft * (type === "yard" ? 2 : 1.5))) * scale);

  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" aria-hidden="true">
      <rect x="10" y="10" width="300" height="200" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
      <rect
        x={160 - w / 2}
        y={110 - h / 2}
        width={w}
        height={h}
        fill={type === "yard" ? "#e5e7eb" : "#1c1c1e"}
        stroke="#c45a11"
        strokeWidth="2"
        rx="2"
      />
      {type === "warehouse" && (
        <>
          <rect x={160 - w / 2} y={110 - h / 2 - 8} width={w * 0.3} height="8" fill="#c45a11" />
          <rect x={160 - w / 2 + w * 0.35} y={110 - h / 2 - 8} width={w * 0.3} height="8" fill="#c45a11" />
        </>
      )}
      <rect x="10" y="10" width="300" height="20" fill="none" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 2" />
      <text x="160" y="24" textAnchor="middle" fill="#6b7280" fontSize="9" fontWeight="600">
        HIGHWAY FRONTAGE
      </text>
      <path d="M 30 195 L 60 195 L 60 185 L 90 195" fill="none" stroke="#c45a11" strokeWidth="1.5" />
      <text x="100" y="198" fill="#c45a11" fontSize="8" fontWeight="600">
        TRUCK ACCESS
      </text>
      {type !== "yard" && (
        <text x="160" y={110 + 4} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">
          {sqft.toLocaleString()} SF
        </text>
      )}
    </svg>
  );
}

const MAX_SQFT = site.landAreaAcres * 43560;

export default function SpaceCalculator() {
  const [sqft, setSqft] = useState(20000);
  const [type, setType] = useState<SpaceType>("warehouse");

  const layout = useMemo(() => calculateLayout(sqft, type), [sqft, type]);

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            Industrial Space Planner
          </h2>
          <p className="mt-4 text-lg text-steel">
            Need 20,000 sq ft? Configure your requirement and see suggested layout,
            truck circulation, and expansion options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white border border-gray-200 rounded-sm p-8">
            <label htmlFor="sqft" className="block text-sm font-semibold uppercase tracking-wider text-steel mb-3">
              Required Area (sq ft)
            </label>
            <input
              id="sqft"
              type="range"
              min={5000}
              max={MAX_SQFT}
              step={1000}
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-steel">5,000</span>
              <span className="text-3xl font-bold text-charcoal">{sqft.toLocaleString()} sq ft</span>
              <span className="text-sm text-steel">{MAX_SQFT.toLocaleString()}</span>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-steel mb-4">
                Space Type
              </p>
              <div className="grid grid-cols-3 gap-3">
                {SPACE_TYPES.map((space) => (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => setType(space.id)}
                    className={`p-4 border rounded-sm text-left transition-all ${
                      type === space.id
                        ? "border-accent bg-accent/5 ring-1 ring-accent"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="block font-semibold text-charcoal text-sm">{space.label}</span>
                    <span className="block text-xs text-steel mt-1">{space.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
            <div className="bg-charcoal text-white px-8 py-4">
              <h3 className="text-lg font-bold">{layout.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{layout.dimensions}</p>
            </div>

            <div className="p-6 bg-gray-100 border-b border-gray-200 h-56">
              <LayoutDiagram type={type} sqft={sqft} />
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-steel mb-2">
                  Truck Circulation
                </h4>
                <p className="text-charcoal">{layout.circulation}</p>
                <p className="text-sm text-accent font-semibold mt-1">
                  {layout.truckBays} truck {type === "yard" ? "parking slots" : "loading positions"}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-steel mb-2">
                  Expansion Possibilities
                </h4>
                <p className="text-charcoal">{layout.expansion}</p>
              </div>

              <ul className="space-y-2">
                {layout.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-steel">
                    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover transition-colors rounded-sm"
              >
                Discuss This Layout — Schedule Site Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
