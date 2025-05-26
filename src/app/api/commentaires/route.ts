import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET /api/commentaires
export async function GET() {
  const commentaires = await prisma.commentaire.findMany();
  return NextResponse.json(commentaires, { status: 200 });
}

// POST /api/commentaires
export async function POST(request: NextRequest) {
  const body = await request.json();
  const {  
  contenu_commentaire,
    date_commentaire,
    id_activite,
    id_utilisateur,
    id_destinataire,
   } = body;
  try {
    const newItem = await prisma.commentaire.create({
      data: { 

        date_commentaire: new Date(date_commentaire),
        id_activite,
        id_utilisateur,
        id_destinataire,

      },
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
