-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT,
    "companyEmail" TEXT,
    "companyAddress" TEXT NOT NULL,
    "companyType" TEXT,
    "password" TEXT,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);
