const url = '/api/commentaires';

export interface CommentaireResponse {
  id_commentaire: number;
  note: number;
  contenu: string;
  date_commentaire: string;
  image_commentaire?: string;
  utilisateurId: number;
  destinationId: number;
  utilisateur: {
    nom: string;
    prenom: string;
  };
  destination: {
    nom: string;
  };
}

export class CommentairesService {
  static async createCommentaire(commentaire: {
    note: number;
    contenu: string;
    id_destinataire: number;
    id_utilisateur: number;
  }): Promise<{ success: boolean; error?: { message?: string; needsAuth?: boolean } }> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note: commentaire.note,
          contenu: commentaire.contenu,
          id_destinataire: commentaire.id_destinataire,
          id_utilisateur: commentaire.id_utilisateur,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { 
          success: false, 
          error: { 
            message: errorData.error || 'Erreur lors de l\'ajout du commentaire', 
            needsAuth: response.status === 401
          } 
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la création du commentaire:', error);
      return { success: false, error: { message: 'Erreur réseau ou serveur' } };
    }
  }

  static async getCommentaires(destinationId: number): Promise<{ 
    success: boolean; 
    data?: CommentaireResponse[]; 
    error?: { message?: string } 
  }> {
    try {
      const response = await fetch(`${url}?destinationId=${destinationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { 
          success: false, 
          error: { message: errorData.error || 'Erreur lors de la récupération des commentaires' } 
        };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      return { success: false, error: { message: 'Erreur réseau ou serveur' } };
    }
  }
}