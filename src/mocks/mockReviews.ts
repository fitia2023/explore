import { Review } from "@/types/Review";

export const mockReviews: Review[] = [
  {
    id: 1,
    userName: "Alice",
    userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment: "Une destination incroyable ! Les paysages étaient à couper le souffle et l'accueil très chaleureux.",
    date: "2025-05-15",
    helpful: 12,
  },
  {
    id: 2,
    userName: "Julien",
    userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    comment: "Très belle expérience. Seul bémol : un peu trop de monde pendant la haute saison.",
    date: "2025-05-20",
    helpful: 5,
  },
  {
    id: 3,
    userName: "Sophie",
    userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 3,
    comment: "Endroit sympathique, mais certaines infrastructures mériteraient un petit rafraîchissement.",
    date: "2025-04-28",
    helpful: 2,
  },
];
