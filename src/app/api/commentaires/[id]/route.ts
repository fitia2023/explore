import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number((await params).id);
  const item = await prisma.commentaire.findUnique({
    where: { id_commentaire: parseInt(params.id) }
  })
  if (!item) return NextResponse.json({ error: 'Commentaire not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  try {
    const updated = await prisma.commentaire.update({
      where: { id_commentaire: parseInt(params.id) },
      data: {
        note: body.note,
        contenu: body.contenu,
        date_commentaire: new Date(body.date_commentaire),
        image_commentaire: body.image_commentaire,
        utilisateurId: body.utilisateurId,
        destinationId: body.destinationId,
        
      }
    })
    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.commentaire.delete({ where: { id_commentaire: parseInt(params.id) } })
    return NextResponse.json({ message: 'Commentaire supprimé' })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }
}
