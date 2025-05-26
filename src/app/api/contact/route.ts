import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const contacts = await prisma.contact.findMany();
  return NextResponse.json(contacts, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { nom, prenom, mail, message, date_envoie } = data;

  const newContact = await prisma.contact.create({
    data: {
      nom,
      prenom,
      mail,
      message,
      date_envoie: new Date(date_envoie),
    },
  });

  return NextResponse.json(newContact, { status: 201 });
}
