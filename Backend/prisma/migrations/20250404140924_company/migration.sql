/*
  Warnings:

  - Made the column `companyName` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyEmail` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyType` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "company" ALTER COLUMN "companyName" SET NOT NULL,
ALTER COLUMN "companyEmail" SET NOT NULL,
ALTER COLUMN "companyType" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
