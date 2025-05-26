import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const destinations = await prisma.destination.findMany();
  return NextResponse.json(destinations, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
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
  } = data;

  const newdestination = await prisma.destination.create({
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

  return NextResponse.json(newdestination, { status: 201 });
}
