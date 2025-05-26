"use client";

import React from 'react';

import Link from "next/link";
import { motion } from 'framer-motion';

export default function CallToAction(){
  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div 
              className="h-64 lg:h-auto bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg)' }}
            ></div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-secondary-600 mb-4">Prêt à voyager de façon responsable ?</h2>
              <p className="text-gray-600 mb-6">
                Rejoignez notre communauté de voyageurs engagés et découvrez comment explorer le monde tout en préservant ses ressources pour les générations futures.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/destinations" 
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-colors duration-300 text-center"
                >
                  Explorer les destinations
                </Link>
                <Link 
                  href="/login" 
                  className="px-6 py-3 bg-white hover:bg-gray-100 text-primary-600 font-medium rounded-full transition-colors duration-300 border border-primary-200 text-center"
                >
                  Créer un compte
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
 