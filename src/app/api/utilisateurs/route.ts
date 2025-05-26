import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const utilisateurs = await prisma.utilisateur.findMany();
  return NextResponse.json(utilisateurs, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const {
    nom,
    prenom,
    mail,
    mot_de_passe,
    date_de_naissance,
    tel,
  } = data;

  try {
    const nouvelUtilisateur = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        mail,
        mot_de_passe,
        date_de_naissance: new Date(date_de_naissance),
        tel,
      },
    });

    return NextResponse.json(nouvelUtilisateur, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}

