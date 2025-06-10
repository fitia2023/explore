'use client';
import React, { useState } from 'react';
import { Shield, FileText, Lock, Mail, MapPin, Phone, Calendar } from 'lucide-react';

export default function LegalPages() {
  const [activeTab, setActiveTab] = useState('mentions');

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Navigation des onglets */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-md p-2 flex">
            <button
              onClick={() => setActiveTab('mentions')}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-all ${activeTab === 'mentions'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
            >
              <FileText size={20} className="inline mr-2" />
              Mentions légales
            </button>
            <button
              onClick={() => setActiveTab('confidentialite')}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-all ${activeTab === 'confidentialite'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
            >
              <Lock size={20} className="inline mr-2" />
              Politique de confidentialité
            </button>
          </div>
        </div>

        {/* Contenu des mentions légales */}
        {activeTab === 'mentions' && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText size={32} className="text-primary-600" />
                </div>
                <h1 className="text-3xl font-bold text-secondary-600">Mentions légales</h1>
                <p className="text-gray-600 mt-2">Informations légales et réglementaires</p>
              </div>

              {/* Cadre du projet - Pleine largeur */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                <h3 className="font-semibold text-blue-600 mb-2"> Projet académique</h3>
                <p className="text-gray-700">
                  <strong>Explore Durable</strong> est un projet réalisé dans le cadre d'un cursus de troisième année
                  universitaire. Ce site web constitue un prototype à des fins pédagogiques et de démonstration.
                </p>
              </div>

              {/* Layout en 2 colonnes pour économiser l'espace */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Colonne de gauche */}
                <div className="space-y-8">
                  {/* Éditeur du site */}
                  <section>
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4 flex items-center">
                      <MapPin size={24} className="text-primary-600 mr-3" />
                      Éditeur du site
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-700 mb-4">
                        <strong className="text-primary-600">Explore Durable</strong> est un projet étudiant développé par : <strong>Fitia</strong> et <strong>Felania</strong>
                      </p>
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-600">
                            <strong>Etablissement :</strong> Iris Mediaschool à Montpellier, France<br />
                            <strong>Niveau :</strong> Bachelor 3<br />
                            <strong>Filière :</strong> Développement web<br />
                            <strong>Année :</strong> 2024-2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>


                  {/* Droit applicable */}
                  <section>
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      Droit applicable et juridiction
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-700">
                        Les présentes mentions légales sont soumises au droit français.
                        En cas de litige, les tribunaux de Montpellier seront seuls compétents.
                      </p>
                    </div>
                  </section>
                  {/* Date de mise à jour */}
                  <section className="text-center mt-8">
                    <div className="bg-primary-50 rounded-lg p-6">
                      <div className="flex items-center justify-center mb-2">
                        <Calendar size={20} className="text-primary-600 mr-2" />
                        <span className="font-semibold text-primary-600">Dernière mise à jour</span>
                      </div>
                      <p className="text-gray-600">10 juin 2025</p>
                    </div>
                  </section>
                </div>

                {/* Colonne de droite */}
                <div className="space-y-8">


                  {/* Responsabilité - Pleine largeur */}
                  {/* Propriété intellectuelle */}
                  <section>
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      Propriété intellectuelle
                    </h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                      <p className="text-gray-700">
                        L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos, icônes, etc.)
                        sont libres de droits. Toute reproduction, même partielle, est interdite sans autorisation
                        écrite préalable.
                      </p>
                    </div>
                  </section>
                  <section className="mt-8">
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      Nature du projet et limitation de responsabilité
                    </h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-700">
                            <strong>Projet à vocation pédagogique :</strong> Ce site web est développé dans un cadre universitaire
                            à des fins d'apprentissage et de démonstration de compétences techniques.
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-700">
                            <strong>Aucun service commercial :</strong> Aucune transaction commerciale réelle n'est effectuée
                            sur cette plateforme. Les fonctionnalités présentées sont des prototypes.
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-700">
                            <strong>Limitation de responsabilité :</strong> L'utilisation de ce site se fait sous votre seule
                            responsabilité. Les informations fournies le sont à titre indicatif dans le cadre de ce projet étudiant.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>


            </div>
          </div>
        )}

        {/* Contenu de la politique de confidentialité */}
        {activeTab === 'confidentialite' && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} className="text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-secondary-600">Politique de confidentialité</h1>
                <p className="text-gray-600 mt-2">Protection et traitement de vos données personnelles</p>
              </div>

              {/* Introduction - Pleine largeur */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                <h3 className="font-semibold text-blue-600 mb-2"> Projet académique</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Explore Durable</strong> est un projet universitaire développé dans le cadre d'un cursus
                  de troisième année. Cette politique de confidentialité présente les bonnes pratiques de protection
                  des données qui seraient appliquées dans un contexte professionnel.
                </p>
                <p className="text-gray-700">
                  <strong>Note :</strong> Les données collectées dans ce prototype sont traitées avec le même niveau
                  de sécurité et de respect de la vie privée qu'un service commercial.
                </p>
              </div>

              {/* Layout en 2 colonnes */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Colonne de gauche */}
                <div className="space-y-8">
                  {/* Responsable du traitement */}
                  <section>
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      1. Responsable du traitement
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-700">
                        <strong>Responsable du projet :</strong> Fitia et Felania<br />
                        <strong>Adresse :</strong> Montpellier, France <br />
                      </p>
                    </div>
                  </section>

                  {/* Données collectées */}
                  <section>
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      2. Données personnelles collectées
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="font-semibold text-secondary-600 mb-3">Lors de la création de compte :</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Nom et prénom</li>
                          <li>Adresse email</li>
                          <li>Numéro de téléphone</li>
                          <li>Date de naissance</li>
                          <li>Mot de passe (crypté)</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="font-semibold text-secondary-600 mb-3">Lors de l'utilisation du service :</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Préférences de voyage</li>
                          <li>Destinations consultées</li>
                          <li>Checklists créées et utilisées</li>
                          <li>Historique des connexions</li>
                          <li>Données de navigation (cookies)</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Base légale */}
                  <section>
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      4. Base légale du traitement
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <ul className="text-gray-700 space-y-2">
                        <li><strong>Exécution du contrat :</strong> Pour la fourniture de nos services</li>
                        <li><strong>Intérêt légitime :</strong> Pour l'amélioration de nos services et la sécurité</li>
                        <li><strong>Obligation légale :</strong> Pour la conservation de certaines données</li>
                      </ul>
                    </div>
                  </section>

                  {/* Partage des données */}
                  <section>
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      6. Partage des données
                    </h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                      <p className="text-gray-700 mb-4">
                        <strong>Principe :</strong> Vos données ne sont jamais vendues à des tiers.
                      </p>
                      <p className="text-gray-700">
                        <strong>Partage limité :</strong> Uniquement avec nos prestataires techniques
                        (hébergement, analytics) sous contrat de confidentialité et dans le respect du RGPD.
                      </p>
                    </div>
                  </section>
                  {/* Droits - Pleine largeur */}
                  <section className="mt-8">
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      7. Vos droits
                    </h2>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-secondary-600 mb-2"> Droit d'accès</h4>
                        <p className="text-gray-600 text-sm">Connaître les données que nous détenons sur vous</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-secondary-600 mb-2"> Droit de rectification</h4>
                        <p className="text-gray-600 text-sm">Corriger vos informations personnelles</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-secondary-600 mb-2"> Droit à l'effacement</h4>
                        <p className="text-gray-600 text-sm">Demander la suppression de vos données</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-secondary-600 mb-2"> Droit à la portabilité</h4>
                        <p className="text-gray-600 text-sm">Récupérer vos données dans un format standard</p>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Colonne de droite */}
                <div className="space-y-8">
                  {/* Finalités */}
                  <section>
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      3. Finalités du traitement
                    </h2>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-4">
                      <p className="text-gray-700">
                        <strong>Cadre pédagogique :</strong> Les données sont collectées uniquement pour démontrer
                        le fonctionnement du prototype et valider les compétences techniques développées.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-green-50 rounded-lg p-6">
                        <h3 className="font-semibold text-green-600 mb-3">Fonctionnalités du prototype</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Démonstration de l'authentification</li>
                          <li>Test des fonctionnalités de checklist</li>
                          <li>Validation de l'interface utilisateur</li>
                          <li>Évaluation académique du projet</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-6">
                        <h3 className="font-semibold text-blue-600 mb-3">Objectifs pédagogiques</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Apprentissage du développement web</li>
                          <li>Mise en pratique des bonnes pratiques RGPD</li>
                          <li>Démonstration de compétences techniques</li>
                          <li>Présentation du projet aux évaluateurs</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Conservation */}
                  <section>
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      5. Durée de conservation
                    </h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-4">
                      <p className="text-gray-700">
                        <strong>Projet temporaire :</strong> Ce prototype étant développé dans un cadre universitaire,
                        les données seront supprimées à la fin de l'année académique (juin 2025) sauf demande contraire des utilisateurs.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="space-y-3">
                        <p className="text-gray-700">
                          <strong>Données de test :</strong> Conservées uniquement pendant la durée du projet (jusqu'en juin 2025)
                        </p>
                        <p className="text-gray-700">
                          <strong>Données de navigation :</strong> Maximum 13 mois conformément à la réglementation
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Cookies */}
                  <section>
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      8. Cookies et technologies similaires
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-secondary-600 mb-2">Cookies essentiels</h4>
                          <p className="text-gray-700">Nécessaires au fonctionnement du site (authentification, sécurité)</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Sécurité */}
                  <section>
                    <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                      9. Sécurité des données
                    </h2>
                    <div className="bg-green-50 rounded-lg p-6">
                      <ul className="text-gray-700 space-y-2">
                        <li> <strong>Chiffrement :</strong> Toutes les données sensibles sont chiffrées</li>
                        <li> <strong>Accès limité :</strong> Seul le personnel autorisé accède aux données</li>
                        <li> <strong>Sauvegardes :</strong> Sauvegardes régulières et sécurisées</li>
                        <li> <strong>Surveillance :</strong> Monitoring constant des accès et activités</li>
                      </ul>
                    </div>
                  </section>
                </div>
              </div>



              {/* Contact - Pleine largeur */}
              <section className="mt-8">
                <h2 className="text-2xl font-bold text-secondary-600 mb-4">
                  10. Contact et réclamations
                </h2>
                <div className="bg-primary-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-primary-600 mb-2">Responsable du projet</h4>
                      <p className="text-gray-700">
                        Email : dpo@explore-durable.com<br />
                        Courrier : Fitia et Felania<br />
                        France, Montpellier
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-600 mb-2">Autorité de contrôle</h4>
                      <p className="text-gray-700">
                        CNIL (Commission Nationale de l'Informatique et des Libertés)<br />
                        <a href="https://www.cnil.fr" className="text-primary-600 hover:underline">www.cnil.fr</a>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}