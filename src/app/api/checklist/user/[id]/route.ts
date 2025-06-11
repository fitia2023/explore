import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

// GET /api/checklist/user/[id] - Récupérer les items cochés d'un utilisateur
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = parseInt((await params).id);

    // Vérification de l'authentification
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      return NextResponse.json({ error: 'Authentification requise' }, { status: 401 });
    }

    // Récupérer tous les items cochés par l'utilisateur
    const checkedItems = await prisma.cocher.findMany({
      where: { utilisateurId: userId },
      include: {
        checklist_item: true,
      },
    });

    return NextResponse.json(checkedItems, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
