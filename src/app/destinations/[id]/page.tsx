"use client";
import DestinationsService from "@/services/destinations.service";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Cloud, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Checklist_item from "@/components/destinations/checklist/Checklist_item";
import { Destination } from "@/types/Destinations";
import { EcoSuggestion } from "@/types/EcoSuggestion";
import { ChecklistItem } from "@/types/CheckListe_Item";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [destination, setDestination] = useState<Destination | null>(
    {} as Destination
  );
  const [ecoSuggestions, setEcoSuggestions] = useState<EcoSuggestion[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const meilleurePeriode =
    Array.isArray(destination?.meilleure_periode)
      ? destination.meilleure_periode
      : destination?.meilleure_periode
      ? JSON.parse(destination.meilleure_periode || "[]")
      : [];

  useEffect(() => {
    async function fetchDestination() {
      try {
        const data = await DestinationsService.getDestinationById(Number(id));
        setDestination(data);
        // Dummy data pour éco-suggestions et checklist
        setEcoSuggestions(data.eco_suggestions);

        setChecklist(data.checklist_items);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    }

    fetchDestination();
  }, [id]);

  if (!destination) {
    return (
      <div className="pt-24 text-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 lg:h-[500px] mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.image1})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
          <Link
            href="/destinations"
            className="relative mb-auto mt-4 inline-flex items-center text-white hover:text-accent-300 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            Retour aux destinations
          </Link>

          <div className="relative text-white max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg md:text-xl text-white/90">
                {destination.pays}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description and Info */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                À propos de cette destination
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {destination.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Cloud size={20} className="text-primary-600 mr-2" />
                    <h3 className="font-semibold text-secondary-700">Climat</h3>
                  </div>
                  <p className="text-gray-600 capitalize">
                    {destination.climate}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CalendarDays size={20} className="text-primary-600 mr-2" />
                    <h3 className="font-semibold text-secondary-700">
                      Meilleure période
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {meilleurePeriode.map((month: string, index: number) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-700 px-2 py-0.5 text-xs rounded"
                      >
                        {month}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Eco Suggestions */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                Conseils Éco-Responsables
              </h2>
              <p className="text-gray-700 mb-6">
                Voici quelques conseils pour réduire votre impact écologique
                lors de votre voyage à {destination.nom}.
              </p>

              <div className="space-y-4">
                {ecoSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id_eco_suggestion}
                    className="border-l-4 border-primary-600 pl-4 py-2"
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary-700 mb-1">
                          {suggestion.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {suggestion.description}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`
                          px-2 py-1 rounded text-xs font-medium
                          ${
                            suggestion.impact === "high"
                              ? "bg-accent-100 text-accent-700"
                              : suggestion.impact === "medium"
                              ? "bg-warning-100 text-warning-700"
                              : "bg-primary-100 text-primary-700"
                          }
                        `}
                        >
                          Impact{" "}
                          {suggestion.impact === "high"
                            ? "élevé"
                            : suggestion.impact === "medium"
                            ? "moyen"
                            : "faible"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Checklist */}
          <div>
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                Checklist de Voyage
              </h2>
              <p className="text-gray-700 mb-6">
                Voici les éléments essentiels à emporter pour votre voyage à{" "}
                {destination.nom}.
              </p>

              <Checklist_item checklist={checklist} />

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-primary-600 mb-4">
                  <CheckCircle size={16} className="mr-1" />
                  <span>Élément en possession</span>
                </div>

                <div className="flex justify-between">
                  {/* <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-colors duration-300 text-sm flex items-center">
                    <ExternalLink size={16} className="mr-1" />
                    Imprimer checklist
                  </button> */}

                  <button className="px-4 py-2 bg-white hover:bg-gray-100 text-primary-600 font-medium rounded-full transition-colors duration-300 border border-primary-200 text-sm">
                    Sauvegarder
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
