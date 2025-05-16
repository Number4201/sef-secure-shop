FROM node:18

WORKDIR /app

# Kopírování package.json a package-lock.json
COPY package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zdrojových souborů
COPY . .

# Spuštění vývojového serveru
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
