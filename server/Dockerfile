# usando uma imagem leve do node.js
FROM node:22-alpine

# definindo o dir de trab dentro do container
WORKDIR /app

# primeiro copia os arquivos de dep para otimizar o cache do docker
COPY package*.json ./

# instala todas as dep
RUN npm install

# copia o resto do codigo
COPY . .

# executa o script de build q tá no package
RUN npm run build

# expoe a porta que o app usa
EXPOSE 3000

# iniciando a aplicação
CMD [ "node", "dist/app.js"]