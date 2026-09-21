-- AlterTable
-- У аккаунтов, созданных через Google, нет ни телефона, ни пароля.
-- Снятие NOT NULL расширяет допустимые значения, существующие строки не затрагивает.
ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL;
ALTER TABLE "users" ALTER COLUMN "password_hash" DROP NOT NULL;

-- AlterTable
-- `sub` из Google ID-токена — стабильный идентификатор Google-профиля.
ALTER TABLE "users" ADD COLUMN "google_id" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");
