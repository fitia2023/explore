import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/destination/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);

  const destination = await prisma.destination.findUnique({
    where: { id_destination: id },
    include: {
      eco_suggestions: true,
      checklist_items: {
        include: {
          checklist_item: true, // Récupère les vrais CheckListe_Item
        },
      },
    },
  });

  if (!destination) {
    return NextResponse.json(
      { error: "destination n'existe pas" },
      { status: 404 }
    );
  }

  // Extraction des vrais checklist_items
  const formatted = {
    ...destination,
    checklist_items: destination.checklist_items.map((c) => c.checklist_item),
  };

  return NextResponse.json(formatted, { status: 200 });
}

// PUT /api/destination/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);
  const body = await request.json();
  const {
    nom,
    pays,
    region,
    description,
    avis_global,
    eco_rating,
    climat,
    meilleure_periode,
    tags,
    image1,
    image2,
    image3,
  } = body;

  if (
    !(await prisma.destination.findUnique({
      where: { id_destination: id },
    }))
  ) {
    return NextResponse.json(
      { error: "destination n'existe pas" },
      { status: 404 }
    );
  }
  const updated = await prisma.destination.update({
    where: { id_destination: id },
    data: {
      nom,
      pays,
      region,
      description,
      avis_global,
      eco_rating,
      climat,
      meilleure_periode,
      tags,
      image1,
      image2,
      image3,
    },
  });
  if (!updated) {
    return NextResponse.json(
      { error: "destination n'existe pas" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated, { status: 200 });
}

// DELETE /api/destination/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);
  await prisma.destination.delete({
    where: { id_destination: id },
  });

  return new Response(null, { status: 204 });
}
