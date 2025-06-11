FROM node:22-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances
RUN npm install 

# Copier le code source
COPY . .

# Générer Prisma
RUN npx prisma generate

# Build de l'application
RUN npm run build

# Démarrer l'application
CMD ["npm", "start"]