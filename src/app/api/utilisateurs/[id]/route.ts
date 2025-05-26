// import prisma from "@/lib/prisma.js";
// import { NextResponse } from "next/server";

// export async function GET(_, { params }) {
//   const item = await prisma.utilisateur.findUnique({
//     where: { id_utilisateur: parseInt(params.id) }
//   })
//   if (!item) return NextResponse.json({ error: 'Utilisateur not found' }, { status: 404 })
//   return NextResponse.json(item)
// }

// export async function PUT(request, { params }) {
//   const body = await request.json()
//   try {
//     const updated = await prisma.utilisateur.update({
//       where: { id_utilisateur: parseInt(params.id) },
//       data: {
//         nom: body.nom,
//         prenom: body.prenom,
//         mail: body.mail,
//         mot_de_passe: body.mot_de_passe,
//         date_de_naissance: new Date(body.date_de_naissance),
//         tel: body.tel,

//       }
//     })
//     return NextResponse.json(updated)
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 400 })
//   }
// }

// export async function DELETE(_, { params }) {
//   try {
//     await prisma.utilisateur.delete({ where: { id_utilisateur: parseInt(params.id) } })
//     return NextResponse.json({ message: 'Utilisateur supprimé' })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 400 })
//   }
// }


import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

// GET /api/utilisateurs/[id]
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

// PUT /api/utilisateurs/[id]
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

// DELETE /api/utilisateurs/[id]
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
