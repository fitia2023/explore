"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DestinationsService from "@/services/destinations.service";

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await DestinationsService.getDestinations();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  // Only show 3 featured destinations
  const featuredDestinations = destinations.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-secondary-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Destinations Éco-Responsables
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Découvrez des lieux où la beauté naturelle et la préservation de
            l&apos;environnement vont de pair.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="relative h-60 overflow-hidden">
                <img
                    src={destination.image1}
                    alt={destination.nom}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-700 mb-2">
                  {destination.nom}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {destination.description}
                </p>

                <Link
                  href={`/destinations/${destination.id}`}
                  className="inline-block px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-colors duration-300 text-sm"
                  onClick={() => setSelectedDestination(destination)}
                >
                  Explorer
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-colors duration-300 inline-block"
          >
            Voir toutes les destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
