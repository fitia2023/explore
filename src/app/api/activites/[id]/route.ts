import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/activites/[id]
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number((await params).id);
  const activites = await prisma.activite.findUnique({
    where: { id_activite: id },
  });

  if (!activites) {
    return NextResponse.json(
      { error: "activites n'existe pas" },
      { status: 404 }
    );
  }

  return NextResponse.json(activites, { status: 200 });
}

// PUT /api/activites/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number((await params).id);
  const body = await request.json();
  const {
    nom_activite,
    description_activite,
    image_activite,
    destination,
    destinationId,
  } = body;

  if (
    !(await prisma.activite.findUnique({
      where: { id_activite: id },
    }))
  ) {
    return NextResponse.json(
      { error: "activites n'existe pas" },
      { status: 404 }
    );
  }
  const updated = await prisma.activite.update({
    where: { id_activite: id },
    data: {
      nom_activite: nom_activite,
      description_activite: description_activite,
      image_activite: image_activite,
      destination: destination,
      destinationId: destinationId,
    },
  });
  if (!updated) {
    return NextResponse.json(
      { error: "activites n'existe pas" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated, { status: 200 });
}

// DELETE /api/activites/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number((await params).id);
  await prisma.activite.delete({
    where: { id_activite: id },
  });

  return new Response(null, { status: 204 });
}
