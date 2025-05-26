// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Données directement dans le fichier (évite les problèmes d'import JSON)
const seedData = {
  destinations: [
    {
      nom: "Costa Rica",
      pays: "Costa Rica",
      region: "Amérique Centrale",
      description:
        "A paradise for eco-tourists with extensive national parks, protected rainforests, and a commitment to sustainable tourism.",
      avis_global: 4.8,
      eco_rating: 5,
      climat: "tropical",
      meilleure_periode: JSON.stringify([
        "December",
        "January",
        "February",
        "March",
        "April",
      ]),
      tags: JSON.stringify(["rainforest", "beaches", "wildlife", "adventure"]),
      image1:
        "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg",
    },
    {
      nom: "Iceland",
      pays: "Iceland",
      region: "Europe du Nord",
      description:
        "A leader in renewable energy with breathtaking landscapes, geothermal pools, and a strong commitment to environmental protection.",
      avis_global: 4.9,
      eco_rating: 5,
      climat: "subarctic",
      meilleure_periode: JSON.stringify([
        "June",
        "July",
        "August",
        "September",
      ]),
      tags: JSON.stringify([
        "glaciers",
        "hot springs",
        "northern lights",
        "hiking",
      ]),
      image1:
        "https://images.pexels.com/photos/1612371/pexels-photo-1612371.jpeg",
    },
    {
      nom: "Slovenia",
      pays: "Slovenia",
      region: "Europe Centrale",
      description:
        "Europe's green gem with pristine lakes, mountains, and a capital city committed to zero waste and sustainable development.",
      avis_global: 4.6,
      eco_rating: 4,
      climat: "continental",
      meilleure_periode: JSON.stringify([
        "May",
        "June",
        "July",
        "August",
        "September",
      ]),
      tags: JSON.stringify(["lakes", "mountains", "culture", "hiking"]),
      image1:
        "https://images.pexels.com/photos/2098408/pexels-photo-2098408.jpeg",
    },
    {
      nom: "Palau",
      pays: "Palau",
      region: "Océanie",
      description:
        "An island nation that prioritizes marine conservation, with the first shark sanctuary and a pledge from visitors to preserve the environment.",
      avis_global: 4.9,
      eco_rating: 5,
      climat: "tropical",
      meilleure_periode: JSON.stringify([
        "November",
        "December",
        "January",
        "February",
        "March",
        "April",
      ]),
      tags: JSON.stringify(["snorkeling", "diving", "beaches", "marine life"]),
      image1:
        "https://images.pexels.com/photos/1268122/pexels-photo-1268122.jpeg",
    },
    {
      nom: "Bhutan",
      pays: "Bhutan",
      region: "Asie du Sud",
      description:
        "The carbon-negative country committed to sustainable tourism with gorgeous Himalayan scenery and a focus on Gross National Happiness.",
      avis_global: 4.7,
      eco_rating: 5,
      climat: "alpine",
      meilleure_periode: JSON.stringify([
        "March",
        "April",
        "May",
        "September",
        "October",
        "November",
      ]),
      tags: JSON.stringify(["mountains", "culture", "hiking", "temples"]),
      image1:
        "https://images.pexels.com/photos/11493601/pexels-photo-11493601.jpeg",
    },
    {
      nom: "New Zealand",
      pays: "New Zealand",
      region: "Océanie",
      description:
        "Known for its commitment to conservation, renewable energy, and sustainable tourism practices amid stunning diverse landscapes.",
      avis_global: 4.8,
      eco_rating: 4,
      climat: "temperate",
      meilleure_periode: JSON.stringify([
        "December",
        "January",
        "February",
        "March",
      ]),
      tags: JSON.stringify(["mountains", "hiking", "wildlife", "adventure"]),
      image1:
        "https://images.pexels.com/photos/724949/pexels-photo-724949.jpeg",
    },
  ],
  checklist_items: [
    {
      nom_item: "Reusable water bottle",
      description:
        "Bring a durable, leak-proof water bottle to reduce plastic waste",
      categorie: "essentials",
      requis: true,
      eco_friendly: true,
    },
    {
      nom_item: "Reusable shopping bag",
      description:
        "Lightweight, foldable bag for shopping and reducing plastic use",
      categorie: "essentials",
      requis: true,
      eco_friendly: true,
    },
    {
      nom_item: "Phone and charger",
      description: "Essential for communication and navigation",
      categorie: "technology",
      requis: true,
      eco_friendly: false,
    },
    {
      nom_item: "Passport/ID",
      description: "Essential travel document",
      categorie: "documents",
      requis: true,
      eco_friendly: false,
    },
    {
      nom_item: "Travel insurance information",
      description: "Printed or digital copy of your insurance policy",
      categorie: "documents",
      requis: true,
      eco_friendly: false,
    },
    {
      nom_item: "Bamboo utensil set",
      description:
        "Reusable fork, knife, spoon, and chopsticks to avoid disposable plastics",
      categorie: "eco-friendly",
      requis: false,
      eco_friendly: true,
    },
    {
      nom_item: "Solid shampoo bar",
      description: "Plastic-free alternative to liquid shampoo",
      categorie: "eco-friendly",
      requis: false,
      eco_friendly: true,
    },
    {
      nom_item: "Reef-safe sunscreen",
      description: "Sunscreen that doesn't harm marine ecosystems",
      categorie: "eco-friendly",
      requis: false,
      eco_friendly: true,
    },
    // Costa Rica specific items
    {
      nom_item: "Quick-dry clothing",
      description:
        "Lightweight, moisture-wicking clothing for humid rainforest climate",
      categorie: "clothing",
      requis: true,
      eco_friendly: false,
    },
    {
      nom_item: "Biodegradable insect repellent",
      description:
        "Protection against mosquitoes without harming the ecosystem",
      categorie: "essentials",
      requis: true,
      eco_friendly: true,
    },
    {
      nom_item: "Rain jacket",
      description: "Even in dry season, showers can occur in rainforest areas",
      categorie: "clothing",
      requis: true,
      eco_friendly: false,
    },
    // Iceland specific items
    {
      nom_item: "Thermal layers",
      description: "Base layers to keep warm in cold climate",
      categorie: "clothing",
      requis: true,
      eco_friendly: false,
    },
    {
      nom_item: "Waterproof hiking boots",
      description: "For exploring glaciers and volcanic terrain",
      categorie: "clothing",
      requis: true,
      eco_friendly: false,
    },
    {
      nom_item: "Swimsuit",
      description: "For hot springs and geothermal pools",
      categorie: "clothing",
      requis: true,
      eco_friendly: false,
    },
    // Slovenia specific items
    {
      nom_item: "Hiking shoes",
      description: "Comfortable footwear for mountain trails",
      categorie: "clothing",
      requis: true,
      eco_friendly: false,
    },
    {
      nom_item: "Camera",
      description: "For capturing the scenic lakes and mountains",
      categorie: "technology",
      requis: false,
      eco_friendly: false,
    },
    {
      nom_item: "Light jacket",
      description: "For cool evenings, especially in mountain areas",
      categorie: "clothing",
      requis: true,
      eco_friendly: false,
    },
    // Palau specific items
    {
      nom_item: "Snorkeling gear",
      description: "For exploring the pristine reefs",
      categorie: "essentials",
      requis: false,
      eco_friendly: false,
    },
    {
      nom_item: "UV protection shirt",
      description: "For sun protection while snorkeling or diving",
      categorie: "clothing",
      requis: true,
      eco_friendly: false,
    },
    // Bhutan specific items
    {
      nom_item: "Modest clothing",
      description: "Respectful attire for temple visits",
      categorie: "clothing",
      requis: true,
      eco_friendly: false,
    },
    {
      nom_item: "Warm layers",
      description: "For cold mountain temperatures, especially at night",
      categorie: "clothing",
      requis: true,
      eco_friendly: false,
    },
    {
      nom_item: "Altitude sickness medication",
      description: "Consult your doctor before travel to high-altitude regions",
      categorie: "essentials",
      requis: false,
      eco_friendly: false,
    },
    // New Zealand specific items
    {
      nom_item: "Layered clothing",
      description: "Weather can change quickly in mountainous areas",
      categorie: "clothing",
      requis: true,
      eco_friendly: false,
    },
    {
      nom_item: "Hiking boots NZ",
      description: "For the numerous scenic trails",
      categorie: "essentials",
      requis: true,
      eco_friendly: false,
    },
    {
      nom_item: "Biodegradable soap",
      description: "For camping or staying in eco-lodges",
      categorie: "eco-friendly",
      requis: false,
      eco_friendly: true,
    },
  ],
  eco_suggestions: [
    // Base suggestions for all destinations
    {
      titre: "Offset your carbon footprint",
      description:
        "Use a carbon calculator to estimate your travel emissions and make a donation to offset them.",
      impact: "high",
      categorie: "transportation",
    },
    {
      titre: "Choose eco-certified accommodations",
      description:
        "Look for green certifications like LEED, Green Key, or local eco-labels when booking places to stay.",
      impact: "medium",
      categorie: "accommodation",
    },
    {
      titre: "Support local businesses",
      description:
        "Eat at locally-owned restaurants and shop at local markets to reduce transportation emissions and support the local economy.",
      impact: "medium",
      categorie: "food",
    },
    {
      titre: "Use public transportation",
      description:
        "When available, opt for trains, buses, or shared shuttles instead of private vehicles or taxis.",
      impact: "high",
      categorie: "transportation",
    },
  ],
};

// Mapping des items par destination
const destinationItemsMapping = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Costa Rica
  2: [1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14], // Iceland
  3: [1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 17], // Slovenia
  4: [1, 2, 3, 4, 5, 6, 7, 8, 18, 19], // Palau
  5: [1, 2, 3, 4, 5, 6, 7, 8, 20, 21, 22], // Bhutan
  6: [1, 2, 3, 4, 5, 6, 7, 8, 23, 24, 25], // New Zealand
};

async function main() {
  console.log("🌱 Début du seed...");

  // Nettoyer la base de données
  await prisma.contient.deleteMany();
  await prisma.ecoSuggestion.deleteMany();
  await prisma.checkListe_Item.deleteMany();
  await prisma.destination.deleteMany();

  console.log("🧹 Base de données nettoyée");

  // Insérer les destinations
  const destinations = [];
  for (const [index, dest] of seedData.destinations.entries()) {
    const destination = await prisma.destination.create({
      data: dest,
    });
    destinations.push(destination);
    console.log(`✅ Destination ${dest.nom} créée`);
  }

  // Insérer les items de checklist
  const checklistItems = [];
  for (const [index, item] of seedData.checklist_items.entries()) {
    const checklistItem = await prisma.checkListe_Item.create({
      data: item,
    });
    checklistItems.push(checklistItem);
  }
  console.log(`✅ ${checklistItems.length} items de checklist créés`);

  // Créer les relations contient
  for (const [destIndex, itemIds] of Object.entries(destinationItemsMapping)) {
    const destinationId = parseInt(destIndex);
    for (const itemId of itemIds) {
      await prisma.contient.create({
        data: {
          destinationId: destinationId,
          checklistItemId: itemId,
        },
      });
    }
  }
  console.log("✅ Relations destination-checklist créées");

  // Insérer les suggestions écologiques pour chaque destination
  for (const destination of destinations) {
    for (const suggestion of seedData.eco_suggestions) {
      await prisma.ecoSuggestion.create({
        data: {
          ...suggestion,
          destinationId: destination.id_destination,
        },
      });
    }
  }
  console.log("✅ Suggestions écologiques créées");

  console.log("🎉 Seed terminé avec succès!");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
