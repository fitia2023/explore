import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

// GET /api/checklistes/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const id = parseInt(params.id);
  const item = await prisma.checkListe_Item.findUnique({
    where: { id_checkliste_item: id },
  });

  if (!item) {
    return NextResponse.json({ error: "Checkliste non trouvée" }, { status: 404 });
  }

  return NextResponse.json(item);
}

// PUT /api/checklistes/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  const id = parseInt(params.id);
  const body = await req.json();

  try {
    const updated = await prisma.checkListe_Item.update({
      where: { id_checkliste_item: id },
      data: {
        nom_item: body.nom_item,
        description: body.description,
        categorie: body.categorie,
        requis: body.requis,
        eco_friendly: body.eco_friendly,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE /api/checklistes/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const id = parseInt(params.id);

  try {
    await prisma.checkListe_Item.delete({
      where: { id_checkliste_item: id },
    });
    return NextResponse.json({ message: "Checkliste supprimée" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
