// server/prisma.config.ts
import { defineConfig } from '@prisma/config';
import "dotenv/config"; // Carrega as variáveis do arquivo .env

// Função para gerar a URL correta dependendo do ambiente
const getDatabaseUrl = () => {
    // 1. Tenta pegar a URL do ambiente (injetada pelo Docker ou .env)
    const urlFromEnv = process.env.DATABASE_URL;

    // 2. Se a URL existir e NÃO tiver caracteres de template não resolvidos '${', usa ela.
    // (O Docker Compose resolve as variáveis automaticamente, então cairá aqui quando rodar no container)
    if (urlFromEnv && !urlFromEnv.includes('${')) {
        return urlFromEnv;
    }

    // 3. Caso contrário (rodando local com .env que falhou na interpolação), montamos manualmente.
    const user = process.env.POSTGRES_USER || 'admin';
    const pass = process.env.POSTGRES_PASSWORD || 'senhaaa';
    const dbName = process.env.POSTGRES_DB || 'deckdex_db';
    const host = process.env.DB_HOST || 'localhost'; // Usa localhost por padrão no host
    const port = process.env.DB_PORT || '5432';

    return `postgresql://${user}:${pass}@${host}:${port}/${dbName}?schema=public`;
};

export default defineConfig({
  datasource: {
    provider: 'postgresql',
    url: getDatabaseUrl(),
  },
});