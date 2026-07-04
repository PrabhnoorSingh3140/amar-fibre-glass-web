import { Product, Capability, Testimonial } from './types';

// Import generated images
import heroFactoryImg from './assets/images/hero_factory_frp_1782647500349.jpg';
import frpChemicalTankImg from './assets/images/frp_chemical_tank_1782647516503.jpg';
import frpGratingWalkwayImg from './assets/images/frp_grating_walkway_1782647531079.jpg';

// Imported newly generated premium catalog images
import frpShivlingImg from './assets/images/frp_shivling_1782648835822.jpg';
import frpDecorativeColumnImg from './assets/images/frp_decorative_column_1782648851636.jpg';
import frpFlowerPotImg from './assets/images/frp_flower_pot_1782648866226.jpg';
import frpDoorImg from './assets/images/frp_door_1782648883829.jpg';
import frpPlaygroundSlideImg from './assets/images/frp_playground_slide_1782648903284.jpg';
import frpTractorRoofImg from './assets/images/frp_tractor_roof_1782648918110.jpg';
import frpGymPartImg from './assets/images/frp_gym_part_1782648933519.jpg';
import frpBusBodyImg from './assets/images/frp_bus_body_1782648950297.jpg';

export const IMAGES = {
  hero: heroFactoryImg,
  tank: frpChemicalTankImg,
  grating: frpGratingWalkwayImg,
  shivling: frpShivlingImg,
  decorativeColumn: frpDecorativeColumnImg,
  flowerPot: frpFlowerPotImg,
  door: frpDoorImg,
  playgroundSlide: frpPlaygroundSlideImg,
  tractorRoof: frpTractorRoofImg,
  gymPart: frpGymPartImg,
  busBody: frpBusBodyImg,
};

export const CAPABILITIES: Capability[] = [
  {
    id: 'filament-winding',
    title: 'Filament Winding',
    description: 'High-precision automated continuous glass filament winding under controlled tension for high-pressure storage systems.',
    details: 'Our CNC-controlled multi-axis filament winding systems are designed to lay down continuous glass fiber filaments pre-impregnated with premium resin at precise helical angles. This achieves exceptional hoop and axial tensile strength, ideal for high-pressure vessels, large chemical process pipes, and storage tanks.',
    benefits: [
      'Maximum strength-to-weight ratio for cylindrical products',
      'Consistent wall thickness and glass-to-resin ratio',
      'Helical and hoop fiber winding angles optimized for specific pressures',
      'No welds or seams, eliminating potential leakage spots'
    ],
    processSteps: [
      'Mandrel preparation and release-agent application',
      'CNC programming of winding path and tension control',
      'Fiber delivery through a precise resin bath (Vinyl Ester/Polyester)',
      'Automated helical and circumferential wrapping',
      'Controlled oven curing followed by mandrel extraction'
    ],
    icon: 'Activity'
  },
  {
    id: 'hand-layup',
    title: 'Custom Hand Lay-up',
    description: 'Manual lamination process providing ultimate versatility for complex geometry, dual-laminates, and low-to-medium volumes.',
    details: 'For complex architectural shapes, double-curved covers, industrial gas scrubbers, machine hoods, and specialty items, our master fabricators perform painstaking manual lamination. We use multi-directional glass mats, woven roving, and specialized resin systems, ensuring thorough air-bubble removal using hand rollers.',
    benefits: [
      'Lowest tooling cost and high flexibility in part design',
      'Enables integration of metal inserts, cores, and reinforcements',
      'No size limitations, from small fittings to large custom hoods',
      'Perfect for prototypes and customized low-volume engineering'
    ],
    processSteps: [
      'Precision tooling mold creation and gelcoat spray application',
      'Manual cutting and tailoring of fiber glass reinforcement mats',
      'Resin application and hand-rolling to fully wet the fibers',
      'Staggered layer accumulation for precise thickness distribution',
      'Room-temperature curing and thorough post-curing'
    ],
    icon: 'Layers'
  },
  {
    id: 'pultrusion',
    title: 'Pultrusion Technology',
    description: 'Continuous profile pulling process producing uniform structural shapes with unidirectional tensile strength.',
    details: 'Pultrusion is a continuous manufacturing process that pulls glass fibers through a liquid resin bath and then through a heated steel shaping die. The heat triggers polymerization, curing the resin into a continuous, high-strength structural shape like I-beams, channels, rods, tubes, and angles.',
    benefits: [
      'Continuous production with high longitudinal strength',
      'Strict dimensional tolerance control',
      'Excellent replacement for steel and aluminum structures',
      'Corrosion-resistant and electrically non-conductive profiles'
    ],
    processSteps: [
      'Creel setup with roving packages and continuous mats',
      'Fiber guiding through resin bath and pre-former guides',
      'Entering heated precision steel die to shape and cure',
      'Continuous extraction using reciprocal caterpillar pullers',
      'In-line cutting with automated diamond-grit saws'
    ],
    icon: 'Repeat'
  },
  {
    id: 'compression-molding',
    title: 'Compression Molding (SMC/DMC)',
    description: 'High-pressure press molding utilizing SMC (Sheet) and DMC (Dough) compounds for mass-produced parts.',
    details: 'For mass production of high-strength components such as electrical junction panels, fire-rated doors, and seating, we utilize heavy-duty hydraulic compression presses. This process compresses pre-measured sheet molding compounds (SMC) between heated male and female matched metal molds.',
    benefits: [
      'Double-sided polished, smooth finish with high aesthetic appeal',
      'Excellent repeating accuracy and dimensional stability',
      'Extremely rapid cycle times for large-scale volume production',
      'Uniform density and minimal scrap generation'
    ],
    processSteps: [
      'Preparing and weighing custom SMC/DMC charges',
      'Loading charges into heated matched metal molds',
      'Hydraulic press closure with forces up to 500 tons',
      'Heat-activated cross-linking and consolidation in the mold',
      'Automatic ejection and rapid edge-trimming'
    ],
    icon: 'Maximize2'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'frp-shivling',
    name: 'FRP Shivling',
    category: 'Religious & Cultural',
    description: 'Our FRP Shivling is manufactured using premium-quality Fibre Reinforced Plastic (FRP), offering exceptional durability, a smooth finish, and long-lasting performance.',
    features: [
      'Smooth, seamless aesthetic finish',
      'Extremely lightweight yet exceptionally durable',
      '100% weather, water, and UV resistant',
      'Corrosion-free with zero rust risk',
      'Easy to install and transport with minimal maintenance'
    ],
    specifications: {
      'Primary Material': 'Premium-Grade Fibre Reinforced Plastic (FRP)',
      'Installation': 'Suitable for both Indoor and Outdoor environments',
      'Customization': 'Available in multiple sizes, custom shapes, and dual-tone finishes',
      'Applications': 'Temples, Home Prayer Areas, Gardens, Ashrams, Spiritual Centers, Public Parks',
      'Durability': 'High tensile impact strength, crack-resistant'
    },
    image: frpShivlingImg,
    isPopular: true
  },
  {
    id: 'frp-interior-architectural-decor',
    name: 'FRP Interior & Architectural Decorative Products',
    category: 'Decorative & Landscaping',
    description: 'Exquisitely crafted columns, decorative panels, and custom sculptures designed to enhance the aesthetics of premium spaces.',
    features: [
      'Premium quality composite structures with deep relief carvings',
      'Elegant, luxurious smooth finishes matching classical materials',
      'High strength-to-weight ratio for safe elevated installations',
      'Moisture, rust, and termite proof',
      'Easy and quick installation compared to stone or plaster molding'
    ],
    specifications: {
      'Products Handled': 'Columns, classical pillars, wall panels, premium ceiling domes, sculptures',
      'Aesthetic Finishes': 'Classical white marble, gold gilt, antique copper, polished brass, textured stone',
      'Suitability': 'Both interior and exterior architectural accents',
      'Applications': 'Luxury Homes, Villas, Commercial lobbies, Hotels, Resorts, Temples, Heritage projects',
      'Custom Design': 'Manufactured strictly to architect drawings and specific project dimensions'
    },
    image: frpDecorativeColumnImg,
    isPopular: true
  },
  {
    id: 'frp-decorative-flower-pot',
    name: 'FRP Decorative Flower Pot / Planters',
    category: 'Decorative & Landscaping',
    description: 'Premium lightweight planter pots designed for luxury landscapes, corporate corridors, and outdoor gardens.',
    features: [
      'High-gloss or elegant textured finish with modern fluted designs',
      'Shatter-proof and crack-resistant even under heavy root expansion',
      'UV-stabilized colors that do not fade under direct tropical sunlight',
      'Waterproof structure prevents salt efflorescence and weeping marks',
      'Extremely easy to relocate and clean'
    ],
    specifications: {
      'Shapes & Designs': 'Fluted urns, geometric cubes, tall tapered cylinders, custom organic shapes',
      'Size Range': 'Small tabletop planters to massive tree tubs',
      'Water Protection': 'Built-in water reservoir and drainage outlet compatibility',
      'Applications': 'Residential villas, gardens, premium hotels, shopping malls, corporate parks',
      'Color Options': 'Pastels, classic white, slate gray, custom corporate colors'
    },
    image: frpFlowerPotImg,
    isPopular: true
  },
  {
    id: 'frp-door',
    name: 'FRP Waterproof Door & Frame',
    category: 'Building Products',
    description: 'High-strength structural doors that are completely immune to water damage, termites, and wood-boring insects.',
    features: [
      '100% waterproof and moisture resistant – never swells, warps, or rots',
      'Completely termite and borer proof with zero composite degradation',
      'High impact and structural strength with heavy-duty core lamination',
      'Color-impregnated gelcoat finish that never requires repainting',
      'Supplied with pre-engineered, matching high-strength FRP frames'
    ],
    specifications: {
      'Standard Thickness': '30mm, 35mm, 40mm or customized',
      'Core Options': 'PUF (Polyurethane Foam), Honeycomb, Solid FRP block',
      'Texture Patterns': 'Classic wood-grain, geometric molded panels, plain matte, high gloss',
      'Applications': 'Bathrooms, marine environments, laboratories, schools, hospitals, portable cabins',
      'Hardware Prep': 'Compatible with standard locks, heavy hinges, and door closers'
    },
    image: frpDoorImg,
    isPopular: false
  },
  {
    id: 'frp-playground-slide',
    name: 'FRP Playground Slide',
    category: 'Recreational & Sports',
    description: 'Heavy-duty kids playground slides with ultra-smooth glossy sliding surfaces, built strictly with safety and weatherproofing in mind.',
    features: [
      'Seamless friction-free high-gloss sliding channel',
      'Excellent impact absorption and high load-bearing capacity',
      'UV-stabilized gelcoat prevents sun-bleaching and color fading',
      'No metal edges or splinters – absolute child safety',
      'Low thermal conductivity prevents the slide from heating up under sunlight'
    ],
    specifications: {
      'Safety Compliance': 'Rounded safety side guards and smooth seamless transitions',
      'Standard Lengths': '5 feet, 8 feet, 10 feet, 12 feet, and custom modular runs',
      'Color Options': 'Bright primary colors: Cherry Red, Royal Blue, Sunflower Yellow, Kelly Green',
      'Applications': 'Schools, kindergarten, public municipal parks, residential societies, family resorts',
      'Reinforcement': 'Multi-layer high tensile continuous glass fiber mat backing'
    },
    image: frpPlaygroundSlideImg,
    isPopular: false
  },
  {
    id: 'frp-tractor-roof',
    name: 'FRP Tractor Roofs / Canopies',
    category: 'Automotive & Industrial',
    description: 'Highly durable and lightweight tractor roofs designed to provide robust operator protection from weather and extreme solar heat.',
    features: [
      'Lightweight design reduces fuel consumption and structural center of gravity',
      'Highly resistant to severe rust, farm chemicals, fertilizer dust, and rain',
      'UV-stable pigments resist weathering and prevent brittle cracking',
      'Superior heat insulation shields the operator from radiant solar heat',
      'Excellent acoustic damping eliminates metal-vibration rattle'
    ],
    specifications: {
      'Applications': 'Agricultural Tractors, Harvesters, Farm Machinery, Industrial Utility Vehicles',
      'Compatible Models': 'Custom sizes designed to fit major tractor brands and roll-bar structures',
      'Finish': 'Double-sided smooth or textured finish with robust mounting ribs',
      'Vibration Damping': 'Flexible elastomer washers compatibility for vibration-free ride',
      'Benefits': 'Ensures high operator safety and comfort, increasing daily productivity'
    },
    image: frpTractorRoofImg,
    isPopular: false
  },
  {
    id: 'frp-gym-equipment-parts',
    name: 'FRP Gym Equipment Parts',
    category: 'Recreational & Sports',
    description: 'Custom molded premium fitness equipment components, shrouds, and weight stack covers engineered for high impact and modern gym styling.',
    features: [
      'Excellent impact resistance protects weights and inner mechanisms',
      'Lightweight covers with structural stiffness for easy installation',
      'Scratch-resistant, color-fast surface finish with modern contours',
      'Waterproof and sweat-resistant, easy to sanitize and wipe clean',
      'Extremely low maintenance with lifetime corrosion immunity'
    ],
    specifications: {
      'Typical Products': 'Weight stack shrouds, pulley guards, seat backing covers, console casings',
      'Color and Textures': 'Impregnated textured black, silver grey, or premium custom glossy colors',
      'Mounting': 'Built-in threaded brass inserts for secure vibration-free mounting',
      'Applications': 'Commercial Gyms, Outdoor Fitness Parks, school playgrounds, sports clubs',
      'Custom Molding': 'Manufactured to exact CAD files and equipment frame specifications'
    },
    image: frpGymPartImg,
    isPopular: false
  },
  {
    id: 'frp-bus-body-parts',
    name: 'FRP Bus Body Parts',
    category: 'Automotive & Industrial',
    description: 'Custom-engineered, high-durability fiberglass panels, cowls, and bumpers for commercial buses, school coaches, and specialty vehicles.',
    features: [
      'Reduces total vehicle deadweight, increasing fuel economy and payload',
      'High impact resistance with outstanding mechanical elasticity and toughness',
      'Excellent chemical, exhaust fume, and road-grime corrosion resistance',
      'Allows aerodynamic complex curves that are expensive in sheet metal',
      'Extremely quick repair and replacement downtime'
    ],
    specifications: {
      'Products Range': 'Front and rear cowls, bumpers, dashboard housings, AC duct panels, side covers',
      'Weight Saving': 'Up to 35% lighter than equivalent mild steel or aluminum stampings',
      'Surface Prep': 'Finished in premium gelcoat ready for paint primer or vehicle wraps',
      'Manufacturing': 'Heavy reinforcement at mounting points with integrated metal plates',
      'Applications': 'Intercity buses, school coaches, luxury tourist vans, electric transit vehicles'
    },
    image: frpBusBodyImg,
    isPopular: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Rajesh Nair',
    designation: 'Head of Projects & Engineering',
    company: 'Apex Chemicals Ltd.',
    text: 'Amar Fibre Glass supplied 6 customized vertical vinyl ester storage tanks for our highly corrosive sulfuric acid recovery plant. After 5 years of continuous operation, the tanks show zero degradation, zero weeping, and have required absolutely zero maintenance. Outstanding manufacturing quality and technical compliance!',
    rating: 5,
    date: '2025-11-12'
  },
  {
    id: 't2',
    clientName: 'Amit Verma',
    designation: 'Senior Infrastructure Consultant',
    company: 'Coastal Power Grid Corp.',
    text: 'We specified Amar Fibre Glass\'s molded yellow gratings and non-conductive cable trays for our offshore substation platform. The safety against salt air corrosion is superior to galvanized steel, and the low weight made installation on high-altitude platforms incredibly easy. Excellent engineering support during design phase.',
    rating: 5,
    date: '2026-02-18'
  },
  {
    id: 't3',
    clientName: 'Sanjay Deshmukh',
    designation: 'Chief Procurement Officer',
    company: 'National Water Treatment Systems',
    text: 'We rely on Amar Fibre Glass for custom scrubbers and pultruded components. Their turnaround time, matching precise drawings, and packing is exemplary. The fire-retardancy and tensile strength certifications they provide are rigorous and gave our clients great peace of mind.',
    rating: 4.8,
    date: '2026-05-04'
  }
];
