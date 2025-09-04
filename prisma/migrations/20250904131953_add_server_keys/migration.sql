/*
  Warnings:

  - Added the required column `publicKey` to the `ServersList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subnet` to the `ServersList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ServersList" ADD COLUMN     "country" TEXT,
ADD COLUMN     "publicKey" TEXT NOT NULL,
ADD COLUMN     "subnet" TEXT NOT NULL;
