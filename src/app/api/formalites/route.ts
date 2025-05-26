import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET /api/formalites
export async function GET() {
  const formalites = await prisma.formalite_administrative_Item.findMany();
  return NextResponse.json(formalites, { status: 200 });
}

// POST /api/formalites
export async function POST(req: NextRequest) {
  const data = await req.json();
  const { description_formalite } = data;

  try {
    const newItem = await prisma.formalite_administrative_Item.create({
      data: {
        descripition_formalite: description_formalite,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
