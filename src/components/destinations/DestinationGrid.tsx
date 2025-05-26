"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DestinationGrid({ destinations }) {
  return (
    <div>
      {destinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => {
            const bestTimeToVisit: string[] = (() => {
              try {
                return JSON.parse(destination.meilleure_periode || "[]");
              } catch {
                return [];
              }
            })();

            const tags: string[] = (() => {
              try {
                return JSON.parse(destination.tags || "[]");
              } catch {
                return [];
              }
            })();

            return (
              <motion.div
                key={destination.id_destination}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={destination.image1}
                    alt={destination.nom}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-secondary-700">
                      {destination.nom}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {destination.pays}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {destination.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary-100 text-primary-700 px-2.5 py-0.5 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Meilleure période :
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {bestTimeToVisit.map((month) => (
                        <span
                          key={month}
                          className="bg-gray-100 text-gray-700 px-2 py-0.5 text-xs rounded"
                        >
                          {month}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/destinations/${destination.id_destination}`}
                    className="inline-block px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-colors duration-300 text-sm"
                    onClick={() => onSelectDestination?.(destination)}
                  >
                    Explorer
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Aucune destination trouvée
          </h3>
          <p className="text-gray-500">
            Essayez de modifier vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
}
