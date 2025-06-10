import { NextRequest, NextResponse } from 'next/server';
import { UtilisateurService } from '@/services/utilisateur.service';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { nom, prenom, email, password, dateNaissance, telephone } = await request.json();

    if (!nom || !prenom || !email || !password || !dateNaissance || !telephone) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    const userData = {
      nom,
      prenom,
      mail: email,
      mot_de_passe: password,
      date_de_naissance: new Date(dateNaissance),
      tel: telephone,
    };

    const user = await UtilisateurService.createUser(userData);
    const token = generateToken({
      userId: user.id_utilisateur,
      email: user.mail
    });

    //sauvegarde du token en base
    await UtilisateurService.saveToken(user.id_utilisateur, token);

    const response = NextResponse.json({
      message: 'Compte créé avec succès',
      user: {
        id: user.id_utilisateur,
        nom: user.nom,
        prenom: user.prenom,
        email: user.mail,
      }
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur lors de la création du compte' },
      { status: 400 }
    );
  }
}