import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/contact/[id]
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number((await params).id);
  const contact = await prisma.contact.findUnique({
    where: { id_contact: id },
  });

  if (!contact) {
    return NextResponse.json(
      { error: "Contact n'existe pas" },
      { status: 404 }
    );
  }

  return NextResponse.json(contact, { status: 200 });
}

// PUT /api/contact/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number((await params).id);
  const body = await request.json();
  const { nom, prenom, mail, message, date_envoie } = body;

  if (
    !(await prisma.contact.findUnique({
      where: { id_contact: id },
    }))
  ) {
    return NextResponse.json(
      { error: "Contact n'existe pas" },
      { status: 404 }
    );
  }
  const updated = await prisma.contact.update({
    where: { id_contact: id },
    data: {
      nom,
      prenom,
      mail,
      message,
      date_envoie: new Date(date_envoie),
    },
  });
  if (!updated) {
    return NextResponse.json(
      { error: "Contact n'existe pas" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated, { status: 200 });
}

// DELETE /api/contact/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number((await params).id);
  await prisma.contact.delete({
    where: { id_contact: id },
  });

  return new Response(null, { status: 204 });
}
