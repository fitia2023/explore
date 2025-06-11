import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers"; 

// POST /api/checklist/check - Cocher un item
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { utilisateurId, checklistItemId } = body;

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

    // Vérifier que l'item existe
    const item = await prisma.checkListe_Item.findUnique({
      where: { id_checkliste_item: checklistItemId },
    });

    if (!item) {
      return NextResponse.json({ error: 'Item non trouvé' }, { status: 404 });
    }

    // Créer ou mettre à jour l'item coché
    const checkedItem = await prisma.cocher.upsert({
      where: {
        utilisateurId_checklistItemId: {
          utilisateurId,
          checklistItemId,
        },
      },
      update: {
        date_cocher: new Date(),
      },
      create: {
        utilisateurId,
        checklistItemId,
        date_cocher: new Date(),
      },
    });

    return NextResponse.json(checkedItem, { status: 201 });
  } catch (error) {
    console.error('Erreur lors du cochage:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}