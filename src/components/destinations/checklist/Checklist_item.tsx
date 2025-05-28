"use client";

import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import {ChecklistItem} from "@/types/CheckListe_Item";


type Props = {
  checklist: ChecklistItem[];
};

export default function ChecklistItemComponent({ checklist }: Props) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (!checklist || checklist.length === 0) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-secondary-700 mb-3 capitalize">
          Produits Écologiques
        </h3>
        <ul className="space-y-2">
          {checklist.map((item) => {
            const isChecked = checkedItems.has(item.id_checkliste_item);

            return (
              <li
                key={item.id_checkliste_item}
                className="flex items-start cursor-pointer"
                onClick={() => toggleCheck(item.id_checkliste_item)}
              >
                <div className="mr-2 mt-0.5">
                  {isChecked ? (
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle size={14} className="text-green-600" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-sm" />
                  )}
                </div>
                <div>
                  <span className="font-medium text-secondary-700">
                    {item.nom_item}
                    {item.requis && (
                      <span className="text-accent-600 ml-1">*</span>
                    )}
                  </span>
                  {item.description && (
                    <p className="text-sm text-gray-500">{item.description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
