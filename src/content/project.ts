/**
 * Single source of truth for every fact rendered on the site.
 * Values are taken from the project report and the accompanying research paper.
 * Do not hardcode specs inside components — import from here.
 */

export const project = {
  codename: "TRI·BRID",
  title: "Self-Recharging Solar Tri-Brid Vehicle",
  subtitle: "Integrated IoT, Electric, Petrol & LPG Systems",
  thesis:
    "One chassis. Four energy paths. A vehicle that decides for itself which fuel to burn — and quietly refills its own battery while it moves.",
  year: "2025",
  institution: "Dhanalakshmi College of Engineering",
  institutionNote: "An Autonomous Institution, Affiliated to Anna University, Chennai",
  department: "Department of Electronics & Communication Engineering",
  guide: { name: "Dr. Balamurugan S", credentials: "M.E., Ph.D." },
  team: [
    { name: "Chandrasekhar M", roll: "410721106013" },
    { name: "Jana Pradap S", roll: "410721106028" },
    { name: "Madheshwaran A K", roll: "410721106037" },
  ],
  keywords: [
    "Tri-Brid System",
    "Smart Vehicle",
    "Self-Recharging",
    "Electric Mobility",
    "Sustainability",
  ],
} as const;

/* ------------------------------------------------------------------ *
 * Section 02 — the problem
 * ------------------------------------------------------------------ */

export const problem = {
  label: "The Problem",
  heading: "Transport is the hardest thing to decarbonise.",
  lede:
    "Hybrids improved efficiency but never solved the two things that actually stop adoption: you still have to plug in, and you still can't leave the city. This project attacks both at once.",
  stats: [
    {
      value: 3,
      suffix: "",
      display: "3",
      label: "Energy sources on one chassis",
      detail: "Electric, LPG and petrol — switchable in real time without driver input.",
    },
    {
      value: 100,
      suffix: "%",
      display: "100%",
      label: "Charging infrastructure removed from the equation",
      detail:
        "Solar harvesting plus a light-coil dynamo means the pack tops itself up while driving.",
    },
    {
      value: 0,
      suffix: "",
      display: "0 g",
      label: "Tailpipe CO₂ below 20 km/h",
      detail: "Urban crawl, campus loops and last-mile delivery run fully electric.",
    },
  ],
  drawbacks: [
    { title: "Low solar yield", body: "A roof-mounted array is supplementary, never a sole source." },
    { title: "Charging dependence", body: "Conventional EVs still need the grid to exist nearby." },
    { title: "Range anxiety", body: "Pure-electric range collapses under load, grade or heat." },
    { title: "Energy management", body: "Blending three sources needs real control logic, not a switch." },
    { title: "Infrastructure gaps", body: "Charging deserts make EVs a city-only proposition." },
    { title: "Cost & complexity", body: "Stacking solar onto a hybrid drivetrain raises both." },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * Section 04 — build log
 * ------------------------------------------------------------------ */

export type BuildStage = {
  id: string;
  week: string;
  title: string;
  body: string;
  image: string;
  tag: string;
};

export const buildLog: BuildStage[] = [
  {
    id: "design",
    week: "Stage 01",
    title: "Digital mock-up",
    body:
      "Geometry, wheelbase and load paths were resolved in CAD before a single tube was cut — packaging three drivetrains into one frame is a space problem before it is a power problem.",
    image: "cad-model",
    tag: "Design",
  },
  {
    id: "frame",
    week: "Stage 02",
    title: "Space-frame fabrication",
    body:
      "A tubular steel space frame keeps mass low while giving the engine, motor, battery pack and LPG bottle their own hard points. Welded, squared and jig-checked in the workshop.",
    image: "chassis-frame",
    tag: "Fabrication",
  },
  {
    id: "rolling",
    week: "Stage 03",
    title: "First roll-out",
    body:
      "Suspension, steering and hubs fitted. The bare chassis rolls on its own wheels for the first time — the moment a drawing becomes a vehicle.",
    image: "chassis-rollout",
    tag: "Assembly",
  },
  {
    id: "floorpan",
    week: "Stage 04",
    title: "Floor pan & cockpit",
    body:
      "Aluminium panelling closes the floor, the quilted seat is trimmed and mounted, and the steering column goes in. Driver ergonomics get locked before wiring starts.",
    image: "chassis-floorpan",
    tag: "Assembly",
  },
  {
    id: "powertrain",
    week: "Stage 05",
    title: "Powertrain integration",
    body:
      "The petrol engine, its light coil and the drive coupling land on the rear cradle — the mounting point for the whole self-recharge mechanism.",
    image: "powertrain-mount",
    tag: "Powertrain",
  },
  {
    id: "wiring",
    week: "Stage 06",
    title: "Wiring & energy bus",
    body:
      "Harness routing, the 500 W inverter, charge controller, relay bank and BMS. This is where the tri-brid logic stops being a diagram and becomes copper.",
    image: "chassis-wiring",
    tag: "Electrical",
  },
  {
    id: "control",
    week: "Stage 07",
    title: "Control electronics",
    body:
      "ESP8266, four-channel relay module, charge controller and inverter on the bench. Each channel is switched and load-tested in isolation before it is trusted with a live drivetrain.",
    image: "electronics-bay",
    tag: "IoT",
  },
  {
    id: "body",
    week: "Stage 08",
    title: "Bodywork & livery",
    body:
      "Hand-laid panels in acid yellow-green, nose cone, and the TRIB badge. Paint is the last thing — and the first thing anyone sees.",
    image: "front-trib",
    tag: "Finishing",
  },
  {
    id: "roadtest",
    week: "Stage 09",
    title: "Road validation",
    body:
      "Acceleration, braking, grade climbing and — critically — live mode transitions between electric, LPG and petrol, logged over Blynk while the vehicle is moving.",
    image: "road-dusk",
    tag: "Testing",
  },
];

/* ------------------------------------------------------------------ *
 * Section 05 — mode switching
 * ------------------------------------------------------------------ */

export type Mode = {
  key: "electric" | "lpg" | "petrol";
  name: string;
  range: string;
  min: number;
  max: number;
  headline: string;
  body: string;
  color: string;
  specs: { k: string; v: string }[];
};

export const modes: Mode[] = [
  {
    key: "electric",
    name: "Electric",
    range: "0 – 20 km/h",
    min: 0,
    max: 20,
    headline: "Silent, zero-emission crawl",
    body:
      "A 48 V lithium-ion pack drives a 1 kW BLDC motor. Used for campus loops, dense traffic and the first and last mile of every trip — exactly where a combustion engine is at its most wasteful.",
    color: "#38BDF8",
    specs: [
      { k: "Pack", v: "48 V · 30 Ah Li-ion" },
      { k: "Motor", v: "BLDC via 1 kW controller" },
      { k: "Tailpipe", v: "0 g CO₂" },
    ],
  },
  {
    key: "lpg",
    name: "LPG",
    range: "20 – 50 km/h",
    min: 20,
    max: 50,
    headline: "The economical middle band",
    body:
      "Above city speed the controller hands over to the LPG circuit. A regulator and solenoid valve meter gas into the carburettor, cutting running cost and particulate output compared with petrol at the same load.",
    color: "#7FB069",
    specs: [
      { k: "Delivery", v: "Regulator → carburettor" },
      { k: "Control", v: "Solenoid valve + relay" },
      { k: "Benefit", v: "Lower cost per km" },
    ],
  },
  {
    key: "petrol",
    name: "Petrol",
    range: "50 km/h +",
    min: 50,
    max: 90,
    headline: "Full power when it's asked for",
    body:
      "For highway speeds, steep grades and overtakes the system falls back to petrol. The engine also spins the light coil that continuously returns charge to the pack — the self-recharge loop.",
    color: "#FF6B35",
    specs: [
      { k: "Use case", v: "Highway · grade · towing" },
      { k: "Self-recharge", v: "Light coil → charge controller" },
      { k: "Fallback", v: "Guarantees range" },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Section 06 — charging
 * ------------------------------------------------------------------ */

export const chargeSources = [
  {
    key: "solar",
    name: "Solar array",
    icon: "sun",
    color: "#D8FF3E",
    spec: "75 W · 12 V panel",
    body:
      "Roof-mounted panel feeding a 12 V/24 V 20 A MPPT charge controller. Harvests whenever the vehicle is parked or moving in daylight — no grid, no cable.",
  },
  {
    key: "grid",
    name: "AC mains",
    icon: "plug",
    color: "#38BDF8",
    spec: "48 V · 5 A charger",
    body:
      "Conventional top-up path. A 500 W inverter links the 12 V auxiliary bus to a 220 V AC rail, which the lithium charger converts back to 48 V DC for the traction pack.",
  },
  {
    key: "dynamo",
    name: "Light-coil self-recharge",
    icon: "coil",
    color: "#FF6B35",
    spec: "Engine light coil → controller",
    body:
      "The mechanism the project is named for. Whenever the petrol or LPG engine runs, its light coil generates and the charge controller pushes that energy back into the batteries — the vehicle charges itself while it drives.",
  },
] as const;

/* ------------------------------------------------------------------ *
 * Section 07 — hardware
 * ------------------------------------------------------------------ */

export const hardware: { group: string; items: string[] }[] = [
  {
    group: "Energy storage",
    items: ["48 V 30 Ah lithium-ion traction pack", "12 V 65/85 Ah lead-acid auxiliary", "Battery Management System (BMS)"],
  },
  {
    group: "Power conversion",
    items: ["500 W inverter (12 V DC → 220 V AC)", "48 V 5 A lithium charger", "12 V/24 V 20 A MPPT charge controller"],
  },
  {
    group: "Propulsion",
    items: ["1 kW BLDC motor + controller", "Petrol engine with light coil", "LPG regulator, solenoid valve & carburettor"],
  },
  {
    group: "Harvesting",
    items: ["75 W solar panel", "Light-coil dynamo / regenerative path", "4-channel relay switching bank"],
  },
  {
    group: "Control & IoT",
    items: ["ESP8266 Wi-Fi microcontroller", "Android display unit", "GPS module + Blynk cloud dashboard"],
  },
  {
    group: "Auxiliary loads",
    items: ["Thermostat / thermal cut-off", "Petrol pump", "Solenoid valve actuation"],
  },
];

export const iotFeatures = [
  { title: "Real-time telemetry", body: "Battery voltage, current and temperature streamed to the cloud." },
  { title: "Live GPS tracking", body: "Route and location on a map, visible from any phone." },
  { title: "Remote mode control", body: "Switch energy source and arm systems without touching the vehicle." },
  { title: "Fault detection", body: "Overheat and over-current conditions trigger an automatic cut-off." },
  { title: "Consumption analytics", body: "Per-mode energy logging for range and cost analysis." },
  { title: "Over-the-air updates", body: "ESP8266 firmware revised without a physical teardown." },
];

/* ------------------------------------------------------------------ *
 * Section 09 — impact & roadmap
 * ------------------------------------------------------------------ */

export const roadmap = [
  { when: "Now", what: "Rule-based switching", detail: "Threshold logic on speed and battery state, executed on the ESP8266." },
  { when: "Next", what: "Predictive energy management", detail: "Route-aware AI that pre-selects modes from terrain and traffic data." },
  { when: "Next", what: "Higher-efficiency cells", detail: "Monocrystalline or bifacial arrays to lift harvest per square metre." },
  { when: "Later", what: "Solid-state storage", detail: "Denser, faster-charging packs to extend pure-electric range." },
  { when: "Later", what: "Fleet telemetry", detail: "Multi-vehicle cloud dashboards for logistics and campus shuttle use." },
];

/* ------------------------------------------------------------------ *
 * Media manifest
 * ------------------------------------------------------------------ */

export const imageWidths: Record<string, number[]> = {
  "chassis-assembled": [640, 1024],
  "chassis-floorpan": [640, 1024, 1600, 2200],
  "chassis-frame": [640, 1024],
  "chassis-rollout": [640, 1024, 1600, 2200],
  "chassis-wiring": [640, 1024, 1600, 2200],
  cockpit: [640, 1024],
  "driver-side": [640, 1024, 1600],
  "electronics-bay": [640, 1024],
  "engine-alternator-01": [640],
  "engine-alternator-02": [640],
  "front-trib": [640, 1024],
  "front-trib-alt": [640, 1024],
  "hero-side": [640, 1024, 1600],
  "powertrain-mount": [640, 1024],
  "purple-nose": [640, 1024],
  "road-distance": [640, 1024, 1600],
  "road-dusk": [640, 1024],
  "road-leafy-motion": [640, 1024, 1600],
  "seat-detail": [640, 1024],
  "team-hero": [640, 1024, 1600],
  "team-rollout": [640, 1024, 1600],
};

/** Alt text keyed by slug — the archive reuses these. */
export const imageAlts: Record<string, string> = {
  "chassis-assembled": "Completed space frame of the tri-brid vehicle on the workshop floor",
  "chassis-floorpan": "Aluminium floor pan and steering column fitted to the tubular chassis",
  "chassis-frame": "Bare welded tubular space frame resting on axle stands in the workshop",
  "chassis-rollout": "Chassis on its own wheels rolled outside the workshop for the first time",
  "chassis-wiring": "Wiring harness and control hardware routed through the vehicle frame",
  cockpit: "Cockpit view showing the quilted seat and steering wheel installed",
  "driver-side": "Driver seated in the completed vehicle during a campus test session",
  "electronics-bay": "Bench test rig with inverter, charge controller, relay bank and wiring",
  "engine-alternator-01": "Petrol engine and alternator assembly mounted on the rear cradle",
  "engine-alternator-02": "Close-up of the engine light coil and belt drive used for self-recharging",
  "front-trib": "Front three-quarter view of the finished vehicle with its TRIB badge on the road",
  "front-trib-alt": "Front view of the tri-brid vehicle showing the acid yellow-green nose panel",
  "hero-side": "Side profile of the completed tri-brid vehicle parked beside the college building",
  "powertrain-mount": "Engine and steering assembly mounted on the vehicle chassis",
  "purple-nose": "Parked tri-brid vehicle with a contrasting nose panel finish",
  "road-distance": "Vehicle driving away down an open campus road during range testing",
  "road-dusk": "Side profile of the tri-brid vehicle on the road at dusk",
  "road-leafy-motion": "Vehicle under way on a tree-lined road during a live road test",
  "seat-detail": "Quilted diamond-stitch seat upholstery ahead of installation",
  "team-hero": "The three-member project team with their completed tri-brid vehicle",
  "team-rollout": "Team members with the running vehicle on campus after a successful test",
};

export type VideoKey =
  | "cad-model"
  | "chassis-frame-run"
  | "fuel-lines"
  | "body-wiring"
  | "nose-panel"
  | "road-test-campus"
  | "team-walkaround"
  | "road-run-away";

export const videoMeta: Record<VideoKey, { title: string; note: string }> = {
  "cad-model": { title: "Digital mock-up", note: "CAD walkthrough of the chassis before fabrication" },
  "chassis-frame-run": { title: "Frame inspection", note: "Welds and tube geometry checked on the bare frame" },
  "fuel-lines": { title: "Fuel & gas routing", note: "Petrol and LPG lines plumbed along the frame" },
  "body-wiring": { title: "Panel & loom fit", note: "Body panel going on over the completed harness" },
  "nose-panel": { title: "Nose cone", note: "Final front panel and headlight mounting" },
  "road-test-campus": { title: "Campus road test", note: "Live shakedown with the team on site" },
  "team-walkaround": { title: "Pre-run check", note: "Systems walked through before the run" },
  "road-run-away": { title: "Range run", note: "Vehicle pulling away under power" },
};

/** Editorially curated archive order — workshop first, road second. */
export const gallery: string[] = [
  "chassis-frame",
  "chassis-floorpan",
  "chassis-rollout",
  "chassis-wiring",
  "powertrain-mount",
  "engine-alternator-02",
  "engine-alternator-01",
  "seat-detail",
  "cockpit",
  "chassis-assembled",
  "electronics-bay",
  "team-rollout",
  "front-trib-alt",
  "front-trib",
  "hero-side",
  "purple-nose",
  "road-leafy-motion",
  "road-dusk",
  "driver-side",
  "road-distance",
  "team-hero",
];

export const navItems = [
  { id: "problem", label: "Problem" },
  { id: "concept", label: "Concept" },
  { id: "build", label: "Build Log" },
  { id: "modes", label: "Modes" },
  { id: "charge", label: "Self-Charge" },
  { id: "iot", label: "IoT" },
  { id: "road", label: "Road Test" },
  { id: "impact", label: "Impact" },
  { id: "credits", label: "Team" },
];
