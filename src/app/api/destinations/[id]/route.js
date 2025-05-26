import prisma from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const item = await prisma.destination.findUnique({
    where: { id_destination: parseInt(params.id) }
  })
  if (!item) return NextResponse.json({ error: 'Destination not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(request, { params }) {
  const body = await request.json()
  try {
    const updated = await prisma.destination.update({
      where: { id_destination: parseInt(params.id) },
      data: {
        pays: body.pays,
        region: body.region,
        description: body.description,
        avis_global: body.avis_global,
        image1: body.image1,
        image2: body.image2,
        image3: body.image3,
        
      }
    })
    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(_, { params }) {
  try {
    await prisma.destination.delete({ where: { id_destination: parseInt(params.id) } })
    return NextResponse.json({ message: 'Destination supprimé' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
