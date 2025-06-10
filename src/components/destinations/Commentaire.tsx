"use client";
import React, { useState } from "react";
import { Star, ThumbsUp, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Review } from "@/types/Review";
import { mockReviews } from "@/mocks/mockReviews";


const DestinationReviews: React.FC = () => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
const [reviews, setReviews] = useState<Review[]>(mockReviews);


  const handleAddReview = (review: Omit<Review, "id" | "helpful">) => {
    const newReview: Review = {
      ...review,
      id: Date.now(),
      helpful: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newReview: Omit<Review, "id" | "helpful"> = {
      userName: "Utilisateur",
      userAvatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleAddReview(newReview);

    setRating(5);
    setComment("");
    setIsSubmitting(false);
  };

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
                Publier l'avis
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Liste des avis */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-secondary-700">
                    {review.userName}
                  </h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={`${
                          index < review.rating
                            ? "text-accent-600 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
              <button className="flex items-center text-gray-500 hover:text-primary-600 transition-colors">
                <ThumbsUp size={18} className="mr-1" />
                <span className="text-sm">{review.helpful}</span>
              </button>
            </div>
            <p className="mt-4 text-gray-700">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DestinationReviews;
