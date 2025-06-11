'use client';

import React, { useState ,useEffect} from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, User, ArrowRight, Phone, Calendar } from 'lucide-react';
 

export default function LoginPage() {
  //détermine si en mode connexion ou inscription
  const [isLogin, setIsLogin] = useState(true);

  //stocke les données du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateNaissance: '',
    telephone: ''
  });

  // Gère l'état de chargement du formulaire
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Message d'erreur à afficher en cas de problème
  const [error, setError] = useState('');

  const { user,isLoading, login, register } = useAuth();

  useEffect(() => {
    // Vérification de l'état de l'utilisateur au chargement
    if (user && !isLoading) {
      // Redirection ou action si l'utilisateur est connecté
      window.location.href = '/account'; // Exemple de redirection vers la page de connexion
    }
  }, [user, isLoading]);

  //gère les modifications des champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  //gère l'envoi du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    //vérifier MDP
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    //validation client, les champs sont remplis
    if (!isLogin && (!formData.nom || !formData.prenom || !formData.dateNaissance || !formData.telephone)) {
      setError('Tous les champs sont requis');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          password: formData.password,
          dateNaissance: formData.dateNaissance,
          telephone: formData.telephone
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  //bascule entre connexion et inscription
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    //réinitialisation du formulaire
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateNaissance: '',
      telephone: ''
    });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-secondary-600">
                  {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {isLogin
                    ? 'Accédez à vos checklists et destinations favorites'
                    : 'Rejoignez notre communauté de voyageurs responsables'}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          required={!isLogin}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="prenom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          required={!isLogin}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="dateNaissance"
                          name="dateNaissance"
                          value={formData.dateNaissance}
                          onChange={handleChange}
                          required={!isLogin}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="telephone"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleChange}
                          required={!isLogin}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                          placeholder="Votre numéro de téléphone"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder="Votre email"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder="Votre mot de passe"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required={!isLogin}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        placeholder="Confirmez votre mot de passe"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-colors duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isLogin ? 'Connexion en cours...' : 'Création en cours...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Se connecter' : 'Créer un compte'}
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="ml-1 text-primary-600 hover:text-primary-700 transition-colors font-medium"
                  >
                    {isLogin ? "S'inscrire" : "Se connecter"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}