import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// carrega as variáveis de ambiente (.env)
dotenv.config();

// configura a conexão com o banco
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db', // 'db' é o nome do serviço no docker-compose
  database: process.env.DB_NAME || 'deckdex',
  password: process.env.DB_PASSWORD || 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
});

const importCards = async () => {
  try {
    console.log('Conectando ao banco...');
    
    // caminho da pasta onde estão os JSONs
    const dataDir = path.join(__dirname, '../data');
    
    // 1. lê todos os arquivos dentro da pasta
    const files = fs.readdirSync(dataDir);
    
    console.log(`Encontrados ${files.length} arquivos na pasta.`);

    // 2. loop para processar cada arquivo encontrado
    for (const file of files) {
      // pula arquivos que não sejam .json
      if (path.extname(file) !== '.json') continue;

      const filePath = path.join(dataDir, file);
      console.log(`Lendo arquivo: ${file}...`);

      try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const cards = JSON.parse(rawData);

        // verifica se é uma lista de cartas válida
        if (!Array.isArray(cards)) {
            console.warn(`Arquivo ${file} ignorado: formato inválido (não é uma lista).`);
            continue;
        }

        let insertedCount = 0;

        // 3. insere as cartas do arquivo atual
        for (const card of cards) {
          const types = card.types ? card.types.join(', ') : '';
          const subtypes = card.subtypes ? card.subtypes.join(', ') : '';
          
          const query = `
            INSERT INTO cards (api_id, name, image_url, supertype, types, subtypes)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (api_id) DO NOTHING;
          `;

          const values = [
            card.id,
            card.name,
            card.images?.small || null,
            card.supertype,
            types,
            subtypes
          ];

          await pool.query(query, values);
          insertedCount++;
        }
        console.log(`${insertedCount} cartas importadas de ${file}.`);

      } catch (err) {
        console.error(`[ERROR] Erro ao processar arquivo ${file}:`, err);
      }
    }

    console.log('Processo de importação finalizado!');

  } catch (error) {
    console.error('[ERROR] Erro fatal na conexão ou diretório:', error);
  } finally {
    await pool.end();
  }
};

importCards();