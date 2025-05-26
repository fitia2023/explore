"use client";

import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendContact } from '@/services/contact.service';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    prenom: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   //SIMULER api call
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     setIsSubmitted(true);
  //     setFormData({
  //       name: '',
  //       prenom: '',
  //       email: '',
  //       subject: '',
  //       message: ''
  //     });

  //     //reset success message after 5 seconds
  //     setTimeout(() => {
  //       setIsSubmitted(false);
  //     }, 5000);
  //   }, 1500);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendContact({
        nom: formData.name,
        prenom: formData.prenom,
        mail: formData.email,
        message: formData.message,
        date_envoie: new Date().toISOString(),
      });

      setIsSubmitted(true);
      setFormData({
        name: '',
        prenom: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur s’est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
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
            Contactez-Nous
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Une question, une suggestion ou envie de collaborer ? Nous sommes à votre écoute !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-primary-600 text-white rounded-xl p-8 h-full">
              <h2 className="text-2xl font-bold mb-6">Informations de Contact</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:contact@exploredurable.com" className="text-white/80 hover:text-white transition-colors">
                      contact@exploredurable.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <a href="tel:+33123456789" className="text-white/80 hover:text-white transition-colors">
                      +33 7 58 81 72 92
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <address className="text-white/80 not-italic">
                      7 rue des poiriers<br />
                      34090 Montpellier, France
                    </address>
                  </div>
                </div>
              </div>


            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-secondary-600 mb-6">Envoyez-nous un message</h2>

              {isSubmitted && (
                <motion.div
                  className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-primary-700 font-medium">Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénoms</label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder="Votre e-mail"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    placeholder="Votre message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white font-semibold px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {isSubmitting ? 'Envoi...' : 'Envoyer'}
                  <Send className="ml-2 w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
