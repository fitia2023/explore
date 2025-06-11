"use client";

import { CheckCircle, Save, AlertCircle } from "lucide-react";
import React, { useState,useEffect } from "react";
import {ChecklistItem} from "@/types/CheckListe_Item";
import { useAuth } from "@/contexts/AuthContext";
import { ChecklistService } from "@/services/checklist.service";

type Props = {
  checklist: ChecklistItem[];
};

export default function ChecklistItemComponent({ checklist }: Props) {
 const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);

 // Charger les items cochés de l'utilisateur au montage
  useEffect(() => {
    const loadUserCheckedItems = async () => {
      if (!user || !isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const result = await ChecklistService.getUserCheckedItems(user.id);
        
        if (result.success && result.data) {
          const checkedItemIds = new Set(
            result.data.map(item => item.checklistItemId)
          );
          setCheckedItems(checkedItemIds);
        } else if (result.error?.needsAuth) {
          setError('Vous devez être connecté pour voir vos items sauvegardés');
        } else {
          setError(result.error?.message || 'Erreur lors du chargement');
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Erreur lors du chargement de vos préférences');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserCheckedItems();
  }, [user, isAuthenticated]);
 // Gestion du clic sur un item (toggle synchrone)
  const toggleCheck = (itemId: number) => {
    if (!isAuthenticated) {
      alert('Vous devez être connecté pour sauvegarder vos préférences');
      return;
    }

    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      
      // Marquer qu'il y a des changements non sauvegardés
      setHasUnsavedChanges(true);
      setError(null);
      
      return newSet;
    });
  };

  // Sauvegarde des changements
  const handleSave = async () => {
    if (!user || !isAuthenticated) {
      alert('Vous devez être connecté pour sauvegarder');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const checkedItemIds = Array.from(checkedItems);
      const result = await ChecklistService.saveCheckedItems(user.id, checkedItemIds);

      if (result.success) {
        setHasUnsavedChanges(false);
        // Optionnel: afficher un message de succès
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        successMessage.textContent = 'Préférences sauvegardées avec succès !';
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
          document.body.removeChild(successMessage);
        }, 3000);
      } else if (result.error?.needsAuth) {
        setError('Session expirée, veuillez vous reconnecter');
      } else {
        setError(result.error?.message || 'Erreur lors de la sauvegarde');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  // Grouper les items par catégorie
  const groupedItems = checklist.reduce((acc, item) => {
    const category = item.categorie || 'Autre';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  if (!checklist || checklist.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Aucun élément dans la checklist pour cette destination.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Message d'état */}
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-gray-600">Chargement de vos préférences...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={16} className="text-red-600 mr-2" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {!isAuthenticated && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> Connectez-vous pour sauvegarder vos préférences et les retrouver lors de votre prochaine visite.
          </p>
        </div>
      )}

      {/* Affichage des catégories */}
      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category}>
          <h3 className="font-semibold text-secondary-700 mb-3 capitalize">
            {category}
          </h3>
          <ul className="space-y-2">
            {items.map((item) => {
              const isChecked = checkedItems.has(item.id_checkliste_item);

              return (
                <li
                  key={item.id_checkliste_item}
                  className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => toggleCheck(item.id_checkliste_item)}
                >
                  <div className="mr-3 mt-0.5">
                    {isChecked ? (
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle size={14} className="text-green-600" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-sm hover:border-primary-500 transition-colors" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className={`font-medium ${isChecked ? 'text-gray-600 line-through' : 'text-secondary-700'}`}>
                        {item.nom_item}
                      </span>
                      {item.requis && (
                        <span className="text-accent-600 ml-1" title="Élément requis">*</span>
                      )}
                      {item.eco_friendly && (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          Éco-friendly
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Section de sauvegarde */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-primary-600 mb-4">
          <CheckCircle size={16} className="mr-1" />
          <span>
            {checkedItems.size} élément(s) sélectionné(s)
            {hasUnsavedChanges && isAuthenticated && (
              <span className="text-orange-600 ml-2">(modifications non sauvegardées)</span>
            )}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {isAuthenticated ? (
              <span>Vos préférences seront sauvegardées pour votre prochain voyage</span>
            ) : (
              <span>Connectez-vous pour sauvegarder vos préférences</span>
            )}
          </div>

          {isAuthenticated && (
            <button
              onClick={handleSave}
              disabled={!hasUnsavedChanges || isSaving}
              className={`px-4 py-2 font-medium rounded-full transition-all duration-300 text-sm flex items-center ${
                hasUnsavedChanges && !isSaving
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-1" />
                  Sauvegarder
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
