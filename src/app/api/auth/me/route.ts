import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { UtilisateurService } from '@/services/utilisateur.service';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Token manquant' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    const user = await UtilisateurService.getUserById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id_utilisateur,
        nom: user.nom,
        prenom: user.prenom,
        email: user.mail,
        dateNaissance: user.date_de_naissance,
        telephone: user.tel,
      }
    });
  } catch (error) {
    console.error('Erreur de vérification:', error);
    return NextResponse.json(
      { error: 'Erreur de vérification' },
      { status: 500 }
    );
  }
}