"use client";

import React from "react";
import { Leaf, List, Map, Recycle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <List size={36} className="text-primary-600" />,
    title: "Checklists Personnalisées",
    description:
      "Préparez votre voyage avec des listes adaptées à chaque destination, chaque saison et chaque type d'activité.",
  },
  {
    icon: <Recycle size={36} className="text-primary-600" />,
    title: "Conseils Éco-Responsables",
    description:
      "Découvrez comment voyager en minimisant votre impact sur l'environnement avec nos suggestions adaptées.",
  },
  {
    icon: <Map size={36} className="text-primary-600" />,
    title: "Destinations Durables",
    description:
      "Explorez des lieux qui priorisent le tourisme durable et la protection de l'environnement.",
  },
  {
    icon: <Leaf size={36} className="text-primary-600" />,
    title: "Impact Positif",
    description:
      "Contribuez positivement aux économies locales et à la préservation de l'environnement en suivant nos recommandations.",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-secondary-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Voyagez Mieux, Voyagez Responsable
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Découvrez comment notre plateforme vous aide à préparer et profiter
            de vos voyages de manière responsable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-secondary-700 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
