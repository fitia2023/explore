import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET /api/commentaires
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destinationId = searchParams.get('destinationId');
    
    console.log('DestinationId reçu:', destinationId); // Debug

    let commentaires;
    
    if (destinationId) {
      // Récupérer les commentaires pour une destination spécifique
      commentaires = await prisma.commentaire.findMany({
        where: {
          destinationId: parseInt(destinationId)
        },
        include: {
          utilisateur: {
            select: {
              nom: true,
              prenom: true,
            }
          },
          destination: {
            select: {
              nom: true,
            }
          }
        },
        orderBy: {
          date_commentaire: 'desc'
        }
      });
    } else {
      // Récupérer tous les commentaires
      commentaires = await prisma.commentaire.findMany({
        include: {
          utilisateur: {
            select: {
              nom: true,
              prenom: true,
            }
          },
          destination: {
            select: {
              nom: true,
            }
          }
        },
        orderBy: {
          date_commentaire: 'desc'
        }
      });
    }

    console.log(`${commentaires.length} commentaires trouvés`); // Debug
    return NextResponse.json(commentaires, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des commentaires" },
      { status: 500 }
    );
  }
}

// POST /api/commentaires
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contenu, note, id_utilisateur, id_destinataire } = body;
    
    // Validation des données
    if (!contenu || !note || !id_utilisateur || !id_destinataire) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const newCommentaire = await prisma.commentaire.create({
      data: {
        contenu,
        note: parseInt(note),
        date_commentaire: new Date(),
        utilisateurId: parseInt(id_utilisateur),
        destinationId: parseInt(id_destinataire),
      },
      // Inclure les relations pour retourner l'objet complet
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
          }
        },
        destination: {
          select: {
            nom: true,
          }
        }
      }
    });
    
    return NextResponse.json(newCommentaire, { status: 201 });
  } catch (err) {
    console.error("Erreur lors de la création du commentaire:", err);
    const errorMessage = err instanceof Error ? err.message : "Une erreur inconnue s'est produite";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}