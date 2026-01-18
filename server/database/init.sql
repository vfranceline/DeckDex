-- tabela de usuarios
create table users (
	id SERIAL primary key,
    name VARCHAR(255) not null,
    username VARCHAR(255) unique not null,
	email VARCHAR(255) unique not null,
	password_hash VARCHAR(255) not null,
	created_at timestamp default CURRENT_TIMESTAMP
);

-- tabela de cache de cartas
-- guardando as cartas para melhorar o tempo de resposta
create table cards (
    api_id VARCHAR(50) primary key,
    name VARCHAR(255) not null,
    image_url VARCHAR(500),
    types TEXT, -- fogo, água, grama... (pode ser mais de um)
    supertype VARCHAR(50), -- pokemon, treinador, energia
    subtypes TEXT -- basico, estagio 1, suporte (pode ser mais de um)
);

-- tabela de baralhos
create table decks (
	id SERIAL primary key,
	user_id INTEGER not null,
	name VARCHAR(150) not null,
    is_public BOOLEAN default false,
	created_at timestamp default CURRENT_TIMESTAMP,
--	criando a relação usuario x deck
	constraint fk_user
		foreign key(user_id)
		references users(id)
		on delete cascade 
);

-- tabela de cartas no deck
create table deck_cards (
	deck_id INTEGER not null,
	card_api_id VARCHAR(50) not null,
    quantity INTEGER default 1,

    primary key (deck_id, card_api_id),

    constraint fk_deck
        foreign key(deck_id)
        references decks(id)
        on delete cascade,

    constraint fk_card_cache
        foreign key(card_api_id)
        references cards(api_id)
);

-- tabela de coleção de cartas do usuario
create table user_collection (
    id SERIAL primary key,
    user_id INTEGER not null,
    card_api_id VARCHAR(50),
    quantity INTEGER default 1,

    constraint fk_user
        foreign key(user_id)
        references users(id)
        on delete cascade
);
