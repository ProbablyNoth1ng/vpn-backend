-- AlterTable
ALTER TABLE "public"."UserSession" ADD COLUMN     "oneTimeConfiguration" TEXT;

-- CreateTable
CREATE TABLE "public"."ServersList" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,

    CONSTRAINT "ServersList_pkey" PRIMARY KEY ("id")
);
