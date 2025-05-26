import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET /api/checklistes
export async function GET() {
  const checklistes = await prisma.checkListe_Item.findMany();
  return NextResponse.json(checklistes, { status: 200 });
}

// POST /api/checklistes
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { nom_activite, description_activite, image_activite, destinationId } = body;
  try {
    const newItem = await prisma.activite.create({
      data: {
        nom_activite,
        description_activite,
        image_activite,
        destinationId: destinationId,
      },
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
