import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { UtilisateurService } from '@/services/utilisateur.service';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        //supprimer le token de la base de données
        await UtilisateurService.removeToken(payload.userId);
      }
    }

    const response = NextResponse.json({ message: 'Déconnexion réussie' });
    response.cookies.delete('auth-token');
    return response;
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
    const response = NextResponse.json({ message: 'Déconnexion réussie' });
    response.cookies.delete('auth-token');
    return response;
  }
}