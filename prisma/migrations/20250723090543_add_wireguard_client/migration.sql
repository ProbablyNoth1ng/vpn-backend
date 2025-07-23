-- CreateTable
CREATE TABLE "WireGuardClient" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "privateKey" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WireGuardClient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WireGuardClient" ADD CONSTRAINT "WireGuardClient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
