"use client";
import React, { useState, useEffect } from "react";
import { Star, ThumbsUp, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { CommentairesService, CommentaireResponse } from "@/services/commentaires.service";

interface DestinationReviewsProps {
  destinationId: string | number;
}

const DestinationReviews: React.FC<DestinationReviewsProps> = ({ 
  destinationId
}) => { 
  destinationId = Number(destinationId);
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reviews, setReviews] = useState<CommentaireResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les commentaires au montage du composant
  useEffect(() => {
    if (destinationId && destinationId > 0) {
      loadReviews();
    }
  }, [destinationId]);

  const loadReviews = async () => {
    if (!destinationId || destinationId <= 0) {
      console.log('DestinationId invalide:', destinationId);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await CommentairesService.getCommentaires(destinationId);
      
      if (result.success && result.data) {
        setReviews(result.data);
      } else {
        setError(result.error?.message || 'Erreur lors du chargement des commentaires');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors du chargement des commentaires');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Vous devez être connecté pour laisser un avis');
      window.location.href = '/login';
      return;
    }

    if (!destinationId || destinationId <= 0) {
      alert('Destination invalide');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await CommentairesService.createCommentaire({
        note: rating,
        contenu: comment,
        id_destinataire: destinationId,
        id_utilisateur: user.id, 
      });

      if (!result.success) {
        if (result.error?.needsAuth) {
          alert(result.error.message || 'Vous devez être connecté');
          window.location.href = '/login';
          return;
        }
        throw new Error(result.error?.message || 'Erreur lors de l\'ajout de l\'avis');
      }

      // Succès - Recharger les commentaires pour afficher le nouveau
      await loadReviews();
      setRating(5);
      setComment("");
      
    } catch (error) {
      console.error('Erreur:', error);
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'ajout de l\'avis');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!destinationId || destinationId <= 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Destination non trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Formulaire d'avis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-xl font-bold text-secondary-600 mb-4">
          Partagez votre expérience
        </h3>

        {!user ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Vous devez être connecté pour laisser un avis.
            </p>
            <button
              onClick={() => window.location.href = '/login'}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-colors duration-300"
            >
              Se connecter
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={`${
                        value <= rating
                          ? "text-accent-600 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Votre avis
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="Partagez votre expérience..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-colors duration-300 flex items-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                        5.291A7.962 7.962 0 014 12H0c0 3.042 
                        1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Publier l&apos;avis
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>

      {/* Liste des avis */}
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={loadReviews}
              className="mt-2 text-red-600 hover:text-red-800 underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {reviews.length === 0 && !error ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun avis pour le moment. Soyez le premier à partager votre expérience !</p>
          </div>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review.id_commentaire}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                    {review.utilisateur.prenom[0]}{review.utilisateur.nom[0]}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-secondary-700">
                      {review.utilisateur.prenom} {review.utilisateur.nom}
                    </h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={`${
                            index < review.note
                              ? "text-accent-600 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {formatDate(review.date_commentaire)}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center text-gray-500 hover:text-primary-600 transition-colors">
                  <ThumbsUp size={18} className="mr-1" />
                  <span className="text-sm">0</span>
                </button>
              </div>
              <p className="mt-4 text-gray-700">{review.contenu}</p>
              {review.image_commentaire && (
                <img 
                  src={review.image_commentaire} 
                  alt="Image du commentaire" 
                  className="mt-4 rounded-lg max-w-full h-auto"
                />
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default DestinationReviews;