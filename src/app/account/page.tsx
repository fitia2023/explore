'use client';

import React ,{useEffect}from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, Calendar, LogOut, Edit } from 'lucide-react';
 

export default function AccountPage() {
  const { user, logout, isLoading } = useAuth();
 useEffect(() => {
    // Vérification de l'état de l'utilisateur au chargement
    if (!user && !isLoading) {
      // Redirection ou action si l'utilisateur n'est pas connecté
      window.location.href = '/login'; // Exemple de redirection vers la page de connexion
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
              <p className="text-center text-gray-600 mt-4">Chargement de votre profil...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //si pas d'user, le middleware s'occupe de la redirection
  if (!user) {
    return null;
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <User size={32} className="text-primary-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {user.prenom} {user.nom}
                    </h1>
                    <p className="text-primary-100">Bienvenue sur votre profil</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors">
                    <Edit size={18} />
                    <span>Modifier</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Nom complet</p>
                      <p className="font-medium text-gray-800">{user.prenom} {user.nom}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Mail size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Adresse e-mail</p>
                      <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Phone size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Téléphone</p>
                      <p className="font-medium text-gray-800">{user.telephone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Calendar size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date de naissance</p>
                      <p className="font-medium text-gray-800">
                        {new Date(user.dateNaissance).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions rapides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg text-left transition-colors">
                    <h4 className="font-medium text-primary-700">Mes destinations</h4>
                    <p className="text-sm text-primary-600 mt-1">Voir mes destinations favorites</p>
                  </button>
                  <button className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg text-left transition-colors">
                    <h4 className="font-medium text-primary-700">Mes checklists</h4>
                    <p className="text-sm text-primary-600 mt-1">Gérer mes listes de voyage</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}