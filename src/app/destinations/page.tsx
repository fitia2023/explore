"use client";

import React, { useEffect, useState } from "react";
import DestinationSearch from "@/components/destinations/DestinationSearch";
import DestinationGrid from "@/components/destinations/DestinationGrid";
import DestinationsService from "@/services/destinations.service";
import { motion } from "framer-motion"; 
import { Destination } from "@/types/Destinations";

export default function Page() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await DestinationsService.getDestinations();
        setDestinations(data);
        // initialisation le filtre
        setFilteredDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase();

    const filtered = destinations.filter(
      (d) =>
        d.nom.toLowerCase().includes(term) ||
        d.pays.toLowerCase().includes(term)
    );

    setFilteredDestinations(filtered);
  }; 

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-600 mb-4">
            Découvrez des Destinations Éco-Responsables
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explorez notre sélection de destinations qui priorisent l&apos;écologie,
            le développement durable et le tourisme responsable.
          </p>
        </motion.div>

        <DestinationSearch onSearch={handleSearch} />

        <DestinationGrid
          destinations={filteredDestinations}
        />
      </div>
    </div>
  );
}
