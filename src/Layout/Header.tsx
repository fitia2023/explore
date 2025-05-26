"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X, User, LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [loginState] = useState({
    isLoggedIn: false, // Replace with actual login state management
  });
  const { isLoggedIn } = loginState;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
  }`;

  const linkClasses = `relative font-medium transition-colors duration-300 hover:text-accent-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
    isScrolled ? "text-secondary-600" : "text-white"
  }`;

  const activeLinkClasses = `${linkClasses} after:scale-x-100 text-accent-600`;

  const logoTextClasses = `font-bold text-xl transition-colors duration-300 ${
    isScrolled ? "text-primary-600" : "text-white"
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf
            className={`transition-colors duration-300 ${
              isScrolled ? "text-primary-600" : "text-white"
            }`}
          />
          <span className={logoTextClasses}>Explore Durable</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={pathname === "/" ? activeLinkClasses : linkClasses}
          >
            Accueil
          </Link>
          <Link
            href="/destinations"
            className={
              pathname.startsWith("/destinations")
                ? activeLinkClasses
                : linkClasses
            }
          >
            Destinations
          </Link>
          <Link
            href="/contact"
            className={
              pathname === "/contact" ? activeLinkClasses : linkClasses
            }
          >
            Contact
          </Link>
          {isLoggedIn ? (
            <Link
              href="/account"
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-300"
            >
              <User size={18} className="mr-2" />
              Mon Compte
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-300"
            >
              <LogIn size={18} className="mr-2" />
              Connexion
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? (
            <X
              className={`w-6 h-6 ${
                isScrolled ? "text-secondary-600" : "text-white"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 ${
                isScrolled ? "text-secondary-600" : "text-white"
              }`}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-secondary-600 font-medium py-2 hover:text-accent-600 transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/destinations"
              className="text-secondary-600 font-medium py-2 hover:text-accent-600 transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="/contact"
              className="text-secondary-600 font-medium py-2 hover:text-accent-600 transition-colors"
            >
              Contact
            </Link>
            {isLoggedIn ? (
              <Link
                href="/account"
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors w-full justify-center"
              >
                <User size={18} className="mr-2" />
                Mon Compte
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors w-full justify-center"
              >
                <LogIn size={18} className="mr-2" />
                Connexion
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
