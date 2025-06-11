
export interface CheckedItem {
  utilisateurId: number;
  checklistItemId: number;
  date_cocher: string;
}

export interface ChecklistResponse {
  success: boolean;
  data?: CheckedItem[];
  error?: { message?: string; needsAuth?: boolean };
}

export class ChecklistService {
  private static readonly baseUrl = '/api/checklist';

  /**
   * Récupère la liste des items cochés par un utilisateur
   */
  static async getUserCheckedItems(userId: number): Promise<ChecklistResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { 
          success: false, 
          error: { 
            message: errorData.error || 'Erreur lors de la récupération des items cochés',
            needsAuth: response.status === 401
          } 
        };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Erreur lors de la récupération des items cochés:', error);
      return { success: false, error: { message: 'Erreur réseau ou serveur' } };
    }
  }

  /**
   * Coche un item pour un utilisateur
   */
  static async checkItem(userId: number, checklistItemId: number): Promise<ChecklistResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          utilisateurId: userId,
          checklistItemId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { 
          success: false, 
          error: { 
            message: errorData.error || 'Erreur lors du cochage de l\'item',
            needsAuth: response.status === 401
          } 
        };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Erreur lors du cochage de l\'item:', error);
      return { success: false, error: { message: 'Erreur réseau ou serveur' } };
    }
  }

  /**
   * Décoche un item pour un utilisateur
   */
  static async uncheckItem(userId: number, checklistItemId: number): Promise<ChecklistResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/uncheck`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          utilisateurId: userId,
          checklistItemId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { 
          success: false, 
          error: { 
            message: errorData.error || 'Erreur lors du décochage de l\'item',
            needsAuth: response.status === 401
          } 
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Erreur lors du décochage de l\'item:', error);
      return { success: false, error: { message: 'Erreur réseau ou serveur' } };
    }
  }

  /**
   * Sauvegarde multiple des items cochés/décochés
   */
  static async saveCheckedItems(userId: number, checkedItemIds: number[]): Promise<ChecklistResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          utilisateurId: userId,
          checkedItemIds,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { 
          success: false, 
          error: { 
            message: errorData.error || 'Erreur lors de la sauvegarde',
            needsAuth: response.status === 401
          } 
        };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return { success: false, error: { message: 'Erreur réseau ou serveur' } };
    }
  }
}