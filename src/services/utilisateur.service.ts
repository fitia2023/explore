import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '@/lib/auth';

const prisma = new PrismaClient();

export interface CreateUserData {
  nom: string;
  prenom: string;
  mail: string;
  mot_de_passe: string;
  date_de_naissance: Date;
  tel: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export class UtilisateurService {
  static async createUser(userData: CreateUserData) {
    //vérifier si email existe déjà
    const existingUser = await prisma.utilisateur.findUnique({
      where: { mail: userData.mail }
    });

    if (existingUser) {
      throw new Error('Cet email est déjà utilisé');
    }

    const hashedPassword = await hashPassword(userData.mot_de_passe);

    return await prisma.utilisateur.create({
      data: {
        ...userData,
        mot_de_passe: hashedPassword,
      },
      select: {
        id_utilisateur: true,
        nom: true,
        prenom: true,
        mail: true,
        date_de_naissance: true,
        tel: true,
      }
    });
  }

  static async authenticateUser(loginData: LoginData) {
    const user = await prisma.utilisateur.findUnique({
      where: { mail: loginData.email }
    });

    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    const isValidPassword = await comparePassword(loginData.password, user.mot_de_passe);

    if (!isValidPassword) {
      throw new Error('Email ou mot de passe incorrect');
    }

    return {
      id_utilisateur: user.id_utilisateur,
      nom: user.nom,
      prenom: user.prenom,
      mail: user.mail,
      date_de_naissance: user.date_de_naissance,
      tel: user.tel,
      token: user.token,
    };
  }

  static async saveToken(userId: number, token: string) {
    return await prisma.utilisateur.update({
      where: { id_utilisateur: userId },
      data: { token }
    });
  }

  static async getUserById(id: number) {
    return await prisma.utilisateur.findUnique({
      where: { id_utilisateur: id },
      select: {
        id_utilisateur: true,
        nom: true,
        prenom: true,
        mail: true,
        date_de_naissance: true,
        tel: true,
      }
    });
  }

  static async removeToken(userId: number) {
    return await prisma.utilisateur.update({
      where: { id_utilisateur: userId },
      data: { token: null }
    });
  }
}