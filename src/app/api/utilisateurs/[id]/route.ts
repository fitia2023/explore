import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

// /api/utilisateurs/[id]
export async function GET(_: NextRequest, { params }: Params) {
  const id = parseInt(params.id);

  const utilisateur = await prisma.utilisateur.findUnique({
    where: { id_utilisateur: id },
  });

  if (!utilisateur) {
    return NextResponse.json({ error: "Utilisateur not found" }, { status: 404 });
  }

  return NextResponse.json(utilisateur);
}

// /api/utilisateurs/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  const id = parseInt(params.id);
  const body = await req.json();

  try {
    const utilisateurMisAJour = await prisma.utilisateur.update({
      where: { id_utilisateur: id },
      data: {
        nom: body.nom,
        prenom: body.prenom,
        mail: body.mail,
        mot_de_passe: body.mot_de_passe,
        date_de_naissance: new Date(body.date_de_naissance),
        tel: body.tel,
      },
    });

    return NextResponse.json(utilisateurMisAJour);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// /api/utilisateurs/[id]
export async function DELETE(_: NextRequest, { params }: Params) {
  const id = parseInt(params.id);

  try {
    await prisma.utilisateur.delete({
      where: { id_utilisateur: id },
    });

    return NextResponse.json({ message: "Utilisateur supprimé" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
