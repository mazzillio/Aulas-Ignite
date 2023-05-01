-- CreateTable
CREATE TABLE "UsersTokens" (
    "id" TEXT NOT NULL,
    "refreseh_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersTokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersTokens" ADD CONSTRAINT "UsersTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
