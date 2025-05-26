"use client";
import React from "react";
import Link from "next/link";
import {
  Leaf,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="text-accent-500" />
              <h2 className="text-xl font-bold">Explore Durable</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Nous aidons les voyageurs à explorer le monde de manière
              responsable et éco-durable, tout en profitant pleinement de leurs
              aventures.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                className="text-gray-300 hover:text-accent-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-300 hover:text-accent-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://facebook.com"
                className="text-gray-300 hover:text-accent-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="text-gray-300 hover:text-accent-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-primary-700 pb-2">
              Liens Rapides
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-accent-500 transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-gray-300 hover:text-accent-500 transition-colors"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-accent-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-accent-500 transition-colors"
                >
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-primary-700 pb-2">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-accent-500" />
                <a
                  href="mailto:contact@exploredurable.com"
                  className="text-gray-300 hover:text-accent-500 transition-colors"
                >
                  contact@exploredurable.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-accent-500" />
                <a
                  href="tel:+33123456789"
                  className="text-gray-300 hover:text-accent-500 transition-colors"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Explore Durable. Tous droits
              réservés.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-gray-400 text-sm hover:text-accent-500 transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-400 text-sm hover:text-accent-500 transition-colors"
              >
                Conditions dutilisation
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 text-sm hover:text-accent-500 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
