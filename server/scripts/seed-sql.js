// server/scripts/seed-sql.js
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
// Carrega o .env
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const getDatabaseUrl = () => {
  let url = process.env.DATABASE_URL;
  
  // Verifica se as variáveis essenciais existem
  if (!process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_DB) {
    throw new Error('ERRO: Variáveis de ambiente (POSTGRES_USER, POSTGRES_PASSWORD, etc) não encontradas no .env');
  }

  // Se a URL do .env contiver variáveis do Docker não expandidas (${...}),
  // montamos a URL manualmente para rodar local (localhost)
  if (!url || url.includes('${')) {
    const user = process.env.POSTGRES_USER;
    const password = process.env.POSTGRES_PASSWORD;
    const dbName = process.env.POSTGRES_DB;
    
    console.log('Detectada URL estilo Docker. Usando credenciais do .env para conectar em localhost...');
    return `postgresql://${user}:${password}@localhost:5432/${dbName}?schema=public`;
  }

  return url;
};

const client = new Client({ connectionString: getDatabaseUrl() });

async function runSeed() {
  try {
    console.log('Conectando ao banco...');
    await client.connect();
    
    console.log('Limpando dados antigos...');
    await client.query(`
      TRUNCATE TABLE deck_cards, user_collection, decks, cards, users 
      RESTART IDENTITY CASCADE;
    `);
    
    const sqlPath = path.join(__dirname, '../database/seed.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Inserindo dados...');
    await client.query(sql);
    console.log('✅ Sucesso! Banco populado e seguro.');

  } catch (err) {
    console.error(err.message);
    process.exit(1); // Encerra com erro
  } finally {
    await client.end();
  }
}

runSeed();