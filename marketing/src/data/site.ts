export const site = {
  name: "Meridian Industrial Park",
  tagline: "Foxconn Corridor Logistics Hub",
  subtitle: "Devanahalli Industrial Spaces",
  description:
    "Flexible industrial land, logistics yard & build-to-suit sheds near Devanahalli on the Airport Corridor.",
  phone: "+91 9342968842",
  email: "avsuhas@gmail.com",
  brochurePdf: "/brochure/meridian-industrial-park.pdf",
  address: "Bashettihalli, Devanahalli–Doddaballapur Main Road, Karnataka, India",
  coordinates: { lat: 13.288753, lng: 77.578379 },
  mapCenter: { lat: 13.288753, lng: 77.578379 },
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1941.4957745550682!2d77.57825072437318!3d13.28846838016923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1781205066573!5m2!1sen!2sus",
  landAreaAcres: 3,
} as const;

export const landmarks = [
  { name: "Foxconn Corridor", distance: "5 km", time: "9 min" },
  { name: "Kempegowda International Airport", distance: "26 km", time: "25 min" },
  { name: "Aerospace Park", distance: "18 km", time: "17 min" },
  { name: "NH44 (Bellary Road)", distance: "17 km", time: "15 min" },
  { name: "STRR (Satellite Ring Road)", distance: "11 km", time: "17 min" },
] as const;

export const locationHighlights = [
  {
    icon: "factory",
    title: "9 mins",
    subtitle: "From Foxconn Ecosystem",
  },
  {
    icon: "highway",
    title: "Highway Frontage",
    subtitle: "Direct Truck Access",
  },
  {
    icon: "plane",
    title: "Airport Corridor",
    subtitle: "Strategic Industrial Belt",
  },
  {
    icon: "expand",
    title: "Expansion Potential",
    subtitle: "Custom Build-To-Suit Options",
  },
] as const;

export const propertySpecs = [
  { label: "Land Area", value: "3 Acres", icon: "land" },
  { label: "Frontage", value: "138.6 Feet", icon: "frontage" },
  {
    label: "Zoning",
    value: "Agricultural",
    detail: "Suitable for Industrial Support Uses",
    icon: "zoning",
  },
  { label: "Utilities", value: "Power Available", icon: "power" },
  { label: "Access", value: "Heavy Vehicle Accessible", icon: "truck" },
  { label: "Security", value: "Fenced Entry Available", icon: "fence" },
] as const;

export const useCases = [
  {
    title: "Logistics Yard",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    items: ["Container storage", "Fleet parking", "Cross-docking"],
  },
  {
    title: "Warehouse Operations",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
    items: ["Distribution", "Inventory storage", "3PL operations"],
  },
  {
    title: "Electronics Vendors",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    items: ["Assembly", "Packaging", "Component storage"],
  },
  {
    title: "Construction Suppliers",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    items: ["Steel", "Cement", "Materials storage"],
  },
] as const;

export const masterPlanPhases = [
  {
    phase: "Phase 1",
    title: "Open Storage Yard",
    description:
      "Immediate deployment for container yards, fleet parking, and material staging with highway frontage access.",
    status: "available",
  },
  {
    phase: "Phase 2",
    title: "Industrial Sheds",
    description:
      "Build-to-suit industrial sheds for warehousing, light manufacturing, and vendor operations.",
    status: "planned",
  },
  {
    phase: "Phase 3",
    title: "Logistics Park",
    description:
      "Integrated logistics park with cross-dock facilities, office blocks, and multi-tenant operations.",
    status: "vision",
  },
] as const;

export const trustPoints = [
  "Direct Ownership",
  "Highway Access",
  "Flexible Lease Terms",
  "Expansion Options",
  "Long-Term Partnership",
] as const;
