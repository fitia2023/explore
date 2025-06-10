import React from 'react';
import { Leaf, Target, CheckCircle, Users, Globe, Lightbulb, Heart, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <Leaf size={40} className="text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-600 mb-6">
            À propos d'<span className="text-primary-600">Explore Durable</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Face aux défis environnementaux actuels, nous proposons une solution innovante :
            une plateforme de planification de voyage qui allie organisation et écoresponsabilité.
          </p>
        </div>

        {/* Le Problème */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-secondary-600 mb-6">
                  Le constat qui nous anime
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg leading-relaxed">
                    <strong className="text-secondary-600">Qui n'a jamais oublié quelque chose d'important en voyage ?</strong>
                  </p>
                  <p>
                    Ces oublis génèrent des achats impulsifs, souvent de produits peu durables et suremballés.
                    Le résultat ? Un impact environnemental évitable et des dépenses supplémentaires qui auraient pu être anticipées.
                  </p>
                  <p>
                    <strong className="text-primary-600">Notre mission :</strong> transformer cette contrainte en opportunité
                    pour un voyage plus organisé et respectueux de l'environnement.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border-l-4 border-red-400">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <span className="text-gray-700">Oublis fréquents en voyage</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span className="text-gray-700">Achats impulsifs et coûteux</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700">Impact environnemental évitable</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700">Stress et désorganisation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notre Solution */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-600 mb-4">
              Notre solution innovante
            </h2>
            <p className="text-xl text-gray-600">
              Une plateforme intelligente qui anticipe vos besoins selon votre destination
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Target size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary-600 mb-4">
                Anticipation intelligente
              </h3>
              <p className="text-gray-600">
                Notre algorithme analyse votre destination (climat)
                pour vous proposer une checklist personnalisée et adaptée.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary-600 mb-4">
                Checklist personnalisée
              </h3>
              <p className="text-gray-600">
                Fini les oublis ! Chaque élément est sélectionné selon les spécificités de votre destination.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Lightbulb size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary-600 mb-4">
                Choix éclairés
              </h3>
              <p className="text-gray-600">
                Nous vous guidons vers des alternatives durables et responsables,
                réduisant votre impact environnemental sans effort supplémentaire.
              </p>
            </div>
          </div>
        </div>

        {/* Nos Objectifs */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-secondary-600">
              Nos objectifs pour un tourisme responsable
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe size={32} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-secondary-600">Organisation optimale</h3>
                <p className="text-gray-600">
                  Aider les voyageurs à anticiper leurs besoins matériels selon leur destination,
                  pour un voyage serein et bien préparé.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-secondary-600">Réduction des imprévus</h3>
                <p className="text-gray-600">
                  Réduire les achats impulsifs et les dépenses imprévues grâce à une
                  checklist personnalisée et réfléchie.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart size={32} className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-secondary-600">Impact écologique</h3>
                <p className="text-gray-600">
                  Promouvoir une organisation qui respecte l'environnement,
                  souvent de manière naturelle et intuitive.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notre Public */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-accent-600" />
              </div>
              <h2 className="text-3xl font-bold text-secondary-600 mb-4">
                Pour qui ?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-secondary-600 mb-4">
                  Notre cible principale
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>Tous les voyageurs</strong> qui souhaitent améliorer leur organisation
                  et réduire leur impact environnemental, qu'ils en soient conscients ou non.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span>Voyageurs occasionnels et réguliers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span>Familles en déplacement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span>Voyageurs d'affaires</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span>Étudiants en mobilité</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-secondary-600 mb-4">
                  Notre approche
                </h3>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    <strong className="text-green-600">L'écoresponsabilité sans contrainte</strong>
                  </p>
                  <p className="text-gray-600">
                    Notre force ? Rendre les pratiques durables <em>naturelles</em> et <em>évidentes</em>.
                    Les voyageurs adoptent des comportements écoresponsables simplement en suivant
                    nos recommandations d'organisation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}