// server/prisma.config.ts
import { defineConfig } from '@prisma/config';
import "dotenv/config"; 

const getDatabaseUrl = () => {
    const urlFromEnv = process.env.DATABASE_URL;

    // 1. Se a URL do .env for válida e não tiver variáveis do Docker (${...}), usa ela
    if (urlFromEnv && !urlFromEnv.includes('${')) {
        return urlFromEnv;
    }

    // 2. Verificação de Segurança: Garante que as variáveis existem antes de montar a URL
    if (!process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_DB) {
        // Retorna string vazia ou lança erro para não vazar undefined/senhas padrão
        throw new Error("Erro: Variáveis de ambiente (POSTGRES_USER, etc) não definidas no .env");
    }

    // 3. Fallback seguro para localhost (usando os valores do .env)
    const user = process.env.POSTGRES_USER;
    const pass = process.env.POSTGRES_PASSWORD;
    const dbName = process.env.POSTGRES_DB;
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '5432';

    return `postgresql://${user}:${pass}@${host}:${port}/${dbName}?schema=public`;
};

export default defineConfig({
  migrations: {
    // Atualizado para usar o seu novo script SQL que funciona
    seed: 'node scripts/seed-sql.js',
  },
  datasource: {
    provider: 'postgresql',
    url: getDatabaseUrl(),
  },
});