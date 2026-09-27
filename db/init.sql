CREATE TABLE IF NOT EXISTS "items" (
  "id" INTEGER NOT NULL PRIMARY KEY,
  "channel_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "image_url" TEXT NOT NULL,
  "rarity" TEXT NOT NULL
  -- FOREIGN KEY ("channel_id") REFERENCES "channel_id" ("id")
);

CREATE TABLE IF NOT EXISTS "inventory" (
  "id" INTEGER NOT NULL PRIMARY KEY,
  "channel_id" TEXT NOT NULL,
  "item_id" INTEGER NOT NULL,
  "user_id" TEXT NOT NULL,
  FOREIGN KEY ("item_id") REFERENCES "items" ("id")
  -- FOREIGN KEY ("channel_id") REFERENCES "channel_id" ("id")
);

CREATE TABLE IF NOT EXISTS "broadcasters" (
  "user_id" TEXT NOT NULL,
  "username" TEXT NOT NULL,
  "access_token" TEXT,
  "refresh_token" TEXT,
  "expiry" INTEGER,
  "overlay_token" TEXT,
  "reward_id" TEXT
)