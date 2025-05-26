import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET /api/activites
export async function GET() {
  const activites = await prisma.activite.findMany();
  return NextResponse.json(activites, { status: 200 });
}

// POST /api/activites
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
