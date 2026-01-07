-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "api_id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(500),
    "types" TEXT,
    "supertype" VARCHAR(50),
    "subtypes" TEXT,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("api_id")
);

-- CreateTable
CREATE TABLE "decks" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "decks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deck_cards" (
    "deck_id" INTEGER NOT NULL,
    "card_api_id" VARCHAR(50) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "deck_cards_pkey" PRIMARY KEY ("deck_id","card_api_id")
);

-- CreateTable
CREATE TABLE "user_collection" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "card_api_id" VARCHAR(50),
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "user_collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "decks" ADD CONSTRAINT "decks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deck_cards" ADD CONSTRAINT "deck_cards_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deck_cards" ADD CONSTRAINT "deck_cards_card_api_id_fkey" FOREIGN KEY ("card_api_id") REFERENCES "cards"("api_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collection" ADD CONSTRAINT "user_collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
