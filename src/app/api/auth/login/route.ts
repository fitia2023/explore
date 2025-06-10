import { NextRequest, NextResponse } from 'next/server';
import { UtilisateurService } from '@/services/utilisateur.service';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const user = await UtilisateurService.authenticateUser({ email, password });

    let token = user.token;

    //si aucun token n'est associé à un utilisateur, on en génère un
    if (!token) {
      token = generateToken({
        userId: user.id_utilisateur,
        email: user.mail
      });

      //enregistrement du token
      await UtilisateurService.saveToken(user.id_utilisateur, token);
    }

    //Réponse avec cookie
    const response = NextResponse.json({
      message: 'Connexion réussie',
      user: {
        id: user.id_utilisateur,
        nom: user.nom,
        prenom: user.prenom,
        email: user.mail,
      }
    });

    //définir le cookie avec le token
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur de connexion' },
      { status: 401 }
    );
  }
}
