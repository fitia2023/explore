import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

// POST /api/checklist/save - Sauvegarde multiple des items cochés
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { utilisateurId, checkedItemIds } = body;

    // Vérification de l'authentification
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      return NextResponse.json({ error: 'Authentification requise' }, { status: 401 });
    }

    // Vérifier que l'utilisateur existe
    const user = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: utilisateurId },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Transaction pour gérer la sauvegarde
    const result = await prisma.$transaction(async (tx) => {
      // 1. Supprimer tous les items cochés existants pour cet utilisateur
      await tx.cocher.deleteMany({
        where: { utilisateurId },
      });

      // 2. Créer les nouveaux items cochés
      if (checkedItemIds && checkedItemIds.length > 0) {
        const createData = checkedItemIds.map((itemId: number) => ({
          utilisateurId,
          checklistItemId: itemId,
          date_cocher: new Date(),
        }));

        await tx.cocher.createMany({
          data: createData,
        });
      }

      // 3. Retourner les items cochés mis à jour
      return await tx.cocher.findMany({
        where: { utilisateurId },
        include: {
          checklist_item: true,
        },
      });
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}