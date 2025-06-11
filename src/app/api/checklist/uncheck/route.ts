import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers"; 

// DELETE /api/checklist/uncheck - Décocher un item
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { utilisateurId, checklistItemId } = body;

    // Vérification de l'authentification
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      return NextResponse.json({ error: 'Authentification requise' }, { status: 401 });
    }

    // Supprimer l'item coché
    await prisma.cocher.delete({
      where: {
        utilisateurId_checklistItemId: {
          utilisateurId,
          checklistItemId,
        },
      },
    });

    return NextResponse.json({ message: 'Item décoché avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors du décochage:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
