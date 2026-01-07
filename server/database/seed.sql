-- 1. Inserir Usuários de teste
-- Obs: Em produção, 'password_hash' deve ser um hash real (ex: bcrypt).
INSERT INTO users (email, password_hash) VALUES 
('ash@ketchum.com', 'hash_senha_secreta_123'),
('misty@cerulean.com', 'hash_senha_agua_456'),
('brock@pewter.com', 'hash_senha_pedra_789');

-- 2. Inserir Cartas (Populando o cache)
INSERT INTO cards (api_id, name, image_url, types, supertype, subtypes) VALUES 
('xy1-1', 'Venusaur', 'https://images.pokemontcg.io/xy1/1.png', 'Grass', 'Pokémon', 'Stage 2'),
('xy1-42', 'Pikachu', 'https://images.pokemontcg.io/xy1/42.png', 'Lightning', 'Pokémon', 'Basic'),
('base1-4', 'Charizard', 'https://images.pokemontcg.io/base1/4.png', 'Fire', 'Pokémon', 'Stage 2'),
('sm1-10', 'Squirtle', 'https://images.pokemontcg.io/sm1/10.png', 'Water', 'Pokémon', 'Basic'),
('xy7-54', 'Gardevoir', 'https://images.pokemontcg.io/xy7/54.png', 'Fairy', 'Pokémon', 'Stage 2'),
('bwp-BW01', 'Snivy', 'https://images.pokemontcg.io/bwp/BW01.png', 'Grass', 'Pokémon', 'Basic');

-- 3. Inserir Baralhos (Decks)
-- O user_id refere-se aos IDs gerados sequencialmente na tabela users (1, 2, 3...)
INSERT INTO decks (user_id, name, is_public) VALUES 
(1, 'Deck do Ash - Iniciais', true),  -- Deck público
(1, 'Deck Elétrico', false),         -- Deck privado
(2, 'Mestres da Água', true),
(3, 'Força da Rocha', false);

-- 4. Inserir Cartas nos Decks (Relacionamento Deck x Cartas)
-- Deck 1 (Ash) contém Pikachu, Charizard e Squirtle
INSERT INTO deck_cards (deck_id, card_api_id, quantity) VALUES 
(1, 'xy1-42', 4),    -- 4 Pikachus
(1, 'base1-4', 2),   -- 2 Charizards
(1, 'sm1-10', 3);    -- 3 Squirtles

-- Deck 2 (Ash - Elétrico) só Pikachu
INSERT INTO deck_cards (deck_id, card_api_id, quantity) VALUES 
(2, 'xy1-42', 4);

-- Deck 3 (Misty)
INSERT INTO deck_cards (deck_id, card_api_id, quantity) VALUES 
(3, 'sm1-10', 4); -- 4 Squirtles

-- 5. Inserir Coleção dos Usuários (Cartas avulsas que eles possuem)
INSERT INTO user_collection (user_id, card_api_id, quantity) VALUES 
(1, 'xy1-1', 1),    -- Ash tem 1 Venusaur na coleção
(1, 'xy7-54', 2),   -- Ash tem 2 Gardevoir
(2, 'sm1-10', 10),  -- Misty tem 10 Squirtles
(3, 'base1-4', 1);  -- Brock tem 1 Charizard raro