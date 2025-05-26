// import prisma from "@/lib/prisma.js";
// import { NextResponse } from "next/server";

// export async function GET(_, { params }) {
//   const item = await prisma.formalite.findUnique({
//     where: { id_formalite_administrative_item: parseInt(params.id) }
//   })
//   if (!item) return NextResponse.json({ error: 'Formalite not found' }, { status: 404 })
//   return NextResponse.json(item)
// }

// export async function PUT(request, { params }) {
//   const body = await request.json()
//   try {
//     const updated = await prisma.formalite.update({
//       where: { id_formalite_administrative_item: parseInt(params.id) },
//       data: {
//         descripition_formalite: body.descripition_formalite,

//       }
//     })
//     return NextResponse.json(updated)
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 400 })
//   }
// }

// export async function DELETE(_, { params }) {
//   try {
//     await prisma.formalite.delete({ where: { id_formalite_administrative_item: parseInt(params.id) } })
//     return NextResponse.json({ message: 'Formalite supprimé' })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 400 })
//   }
// }


import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

// GET /api/formalites/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const id = parseInt(params.id);
  const item = await prisma.formalite_administrative_Item.findUnique({
    where: { id_formalite_administrative_item: id },
  });

  if (!item) {
    return NextResponse.json({ error: "Formalité non trouvée" }, { status: 404 });
  }

  return NextResponse.json(item);
}

// PUT /api/formalites/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  const id = parseInt(params.id);
  const body = await req.json();

  try {
    const updated = await prisma.formalite_administrative_Item.update({
      where: { id_formalite_administrative_item: id },
      data: {
        descripition_formalite: body.descripition_formalite,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE /api/formalites/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const id = parseInt(params.id);

  try {
    await prisma.formalite_administrative_Item.delete({
      where: { id_formalite_administrative_item: id },
    });

    return NextResponse.json({ message: "Formalité supprimée" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
