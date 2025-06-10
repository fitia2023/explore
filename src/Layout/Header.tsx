"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X, User, LogIn, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const pathname = usePathname();

  //utilise le contexte d'authentification
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsUserDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  // Configuration des liens du dropdown
  const dropdownLinks = [
    { href: "/a-propos", label: "A propos" },
    { href: "/mentions-legales", label: "Mentions légales & Politique de confidentialité" },
  ];

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
    }`;

  const linkClasses = `relative font-medium transition-colors duration-300 hover:text-accent-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 text-secondary-600`;

  const activeLinkClasses = `${linkClasses} after:scale-x-100 text-accent-600`;

  const logoTextClasses = `font-bold text-xl transition-colors duration-300 text-primary-600`;

  const dropdownButtonClasses = `relative flex items-center font-medium transition-colors duration-300 hover:text-accent-600 text-secondary-600 ${dropdownLinks.some(link => pathname.startsWith(link.href)) ? "text-accent-600" : ""
    }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="transition-colors duration-300 text-primary-600" />
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

          {/* Dropdown Menu "Autres pages" */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={dropdownButtonClasses}>
              Autres pages
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                >
                  {dropdownLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-primary-50 hover:text-primary-600 ${pathname === link.href
                          ? "bg-primary-50 text-primary-600 border-r-2 border-primary-600"
                          : "text-gray-700"
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/contact"
            className={
              pathname === "/contact" ? activeLinkClasses : linkClasses
            }
          >
            Contact
          </Link>

          {/* Section d'authentification */}
          {isLoading ? (
            <div className="flex items-center px-4 py-2 bg-gray-300 rounded-full animate-pulse">
              <div className="w-4 h-4 mr-2 bg-gray-400 rounded"></div>
              <div className="w-16 h-4 bg-gray-400 rounded"></div>
            </div>
          ) : isAuthenticated ? (
            /* Dropdown User */
            <div
              className="relative"
              onMouseEnter={() => setIsUserDropdownOpen(true)}
              onMouseLeave={() => setIsUserDropdownOpen(false)}
            >
              <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-300">
                <User size={18} />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                  >
                    <Link
                      href="/account"
                      className="flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-primary-50 hover:text-primary-600 text-gray-700"
                    >
                      <User size={16} className="mr-3" />
                      Mon Profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-red-50 hover:text-red-600 text-gray-700"
                    >
                      <LogOut size={16} className="mr-3" />
                      Déconnexion
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
            <X className="w-6 h-6 text-secondary-600" />
          ) : (
            <Menu className="w-6 h-6 text-secondary-600" />
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

            {/* Mobile Dropdown Links */}
            <div className="border-l-2 border-gray-200 pl-4">
              <p className="text-sm font-semibold text-gray-500 mb-2">Autres pages</p>
              {dropdownLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-secondary-600 font-medium py-2 hover:text-accent-600 transition-colors ${pathname === link.href ? "text-accent-600" : ""
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/contact"
              className="text-secondary-600 font-medium py-2 hover:text-accent-600 transition-colors"
            >
              Contact
            </Link>

            {/* Section mobile d'authentification */}
            {isLoading ? (
              <div className="flex items-center px-4 py-2 bg-gray-300 rounded-full animate-pulse w-full justify-center">
                <div className="w-4 h-4 mr-2 bg-gray-400 rounded"></div>
                <div className="w-16 h-4 bg-gray-400 rounded"></div>
              </div>
            ) : isAuthenticated ? (
              <>
                <Link
                  href="/account"
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors w-full justify-center"
                >
                  <User size={18} className="mr-2" />
                  Mon Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors w-full justify-center"
                >
                  <LogOut size={18} className="mr-2" />
                  Déconnexion
                </button>
              </>
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