"use client";
import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface DestinationSearchProps {
  onSearch: (value: string) => void;
}

export default function DestinationSearch({ onSearch }: DestinationSearchProps) {
  const [term, setTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    onSearch(value);  
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 mb-12 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <form className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Où souhaitez-vous aller ?"
              value={term}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            <span>Rechercher</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
