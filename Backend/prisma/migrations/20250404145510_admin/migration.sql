-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "workEmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
